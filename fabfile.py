#-*- coding:utf-8 -*-

"""JsHamcrest build script.
"""

import re
import cStringIO as StringIO

from fabric.api import *


# Project
env.project   = 'jshamcrest'
env.version   = '0.5.2'
env.full_name = '%s-%s' % (env.project, env.version)

# Build output
env.build_dir     = 'build'
env.dist_dir      = 'dist'
env.rev_info_file = '%s/_rev_info.txt' % (env.build_dir,)

# Output script files
env.js             = '%s/%s.js' % (env.build_dir, env.project)
env.js_version     = '%s/%s.js' % (env.build_dir, env.full_name)
env.js_min         = '%s/%s-min.js' % (env.build_dir, env.project)
env.js_min_version = '%s/%s-min.js' % (env.build_dir, env.full_name)

# Test
env.test_dir    = 'test'
env.web_browser = 'firefox'

# Documentation
env.doc_dir = 'doc'

# Source code
env.src_dir   = 'src'
env.src_files = (
    'jshamcrest',
    'core',
    'number',
    'text',
    'object',
    'collection',
    'integration',
)

# Remote server
env.fab_hosts = ('destaquenet.com',)

# Constants
_PATTERN_COMMIT_HASH = re.compile('commit\W+([0-9a-f]+)')
_PATTERN_COMMIT_DATE = re.compile('Date:\W+(.*)')


@runs_once
def clean():
    """Resets the build output directories.
    """
    local('rm -fR %s %s' % (env.build_dir, env.dist_dir))
    local('mkdir -p %s %s' % (env.build_dir, env.dist_dir))

@runs_once
def build():
    """Builds the final script and writes it to the disk.
    """
    _set_revision_info()
    _replace_tokens()
    content = env.src_content.readlines()
    file(env.js, 'w').writelines(content)
    local('cp %s %s' % (env.js, env.js_version))
        

def test():
    """Opens the test suite on a web browser.
    """
    pack()
    web_browser = prompt('Please choose your web browser', \
            default=env.web_browser)
    local('%s %s/testSuite.html &' % (web_browser, env.test_dir))

@runs_once
def doc_clean():
    """Resets the doc output directories.
    """
    local('cd %s; make clean;' % env.doc_dir)

def doc_html():
    """Builds the HTML documentation.
    """
    doc_clean()
    local('cd %s; make html' % env.doc_dir)

def doc_pdf():
    """Builds the PDF documentation."
    """
    doc_clean()
    local('cd %s; make latex' % env.doc_dir)
    local('cd %s/_build/latex; make all-pdf' % env.doc_dir)

def doc():
    """Builds the documentation both in HTML and PDF.
    """
    doc_clean()
    doc_html()
    doc_pdf()

def pack():
    """Creates a minified version of the final script using the Google Closure
    Compiler service.
    """
    build()
    local('python lib/closure_compiler_cli.py -f %s > %s' % (env.js, env.js_min))
    local('cp %s %s' % (env.js_min, env.js_min_version))

def _set_revision_info():
    """Reads information about the latest revision.
    """
    clean()
    local('git rev-list --all --max-count=1 --pretty > %s' % env.rev_info_file)
    rev_info = file(env.rev_info_file, 'r').read()
    env.commit_hash = _PATTERN_COMMIT_HASH.findall(rev_info)[0]
    env.commit_date = _PATTERN_COMMIT_DATE.findall(rev_info)[0]

def _read_files():
    """Reads and joins the source files.
    """
    env.src_content = StringIO.StringIO()
    for file_name in env.src_files:
        file_path = '%s/%s.js' % (env.src_dir, file_name)
        env.src_content.writelines(file(file_path, 'r').readlines())

def _replace_tokens():
    """Replaces the tokens found in the source code.
    """
    _read_files()
    content = env.src_content.getvalue()
    env.src_content = StringIO.StringIO()

    content = content.replace('@VERSION', env.version)
    content = content.replace('@REV', env.commit_hash)
    content = content.replace('@DATE', env.commit_date)

    env.src_content.write(content)
    env.src_content.seek(0)
