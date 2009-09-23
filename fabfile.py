#-*- coding:utf-8 -*-

"""
"""

import re
from StringIO import StringIO

# Project
config.project   = 'jshamcrest'
config.version   = '0.5.2'
config.full_name = '%s-%s' % (config.project, config.version)

# Build output
config.build_dir     = 'build'
config.dist_dir      = 'dist'
config.rev_info_file = '%s/_rev_info.txt' % (config.build_dir,)

# Documentation
config.doc_dir = 'doc'

# Source code
config.src_dir   = 'src'
config.src_files = ('jshamcrest',
                    'core',
                    'number',
                    'text',
                    'object',
                    'collection',
                    'integration',)

# Remote server
config.fab_hosts = ('destaquenet.com',)

# Constants
PATTERN_COMMIT_HASH = re.compile('commit\W+([0-9a-f]+)')
PATTERN_COMMIT_DATE = re.compile('Date:\W+(.*)')

def clean():
    """Resets the build output directories.
    """
    local('rm -fR $(build_dir) $(dist_dir)')
    local('mkdir -p $(build_dir) $(dist_dir)')

@depends(clean)
def set_revision_info():
    """Reads information about the latest revision.
    """
    local('git rev-list --all --max-count=1 --pretty > $(rev_info_file)')
    rev_info = file(config.rev_info_file, 'r').read()
    config.commit_hash = PATTERN_COMMIT_HASH.findall(rev_info)[0]
    config.commit_date = PATTERN_COMMIT_DATE.findall(rev_info)[0]

def read_files():
    """Reads and joins the source files.
    """
    config.src_content = StringIO()
    for file_name in config.src_files:
        file_path = '%s/%s.js' % (config.src_dir, file_name)
        config.src_content.writelines(file(file_path, 'r').readlines())

@depends(read_files)
def replace_tokens():
    """Replaces the tokens found in the source code.
    """
    content = config.src_content.getvalue()
    config.src_content = StringIO()

    content = content.replace('@VERSION', config.version)
    content = content.replace('@REV', config.commit_hash)
    content = content.replace('@DATE', config.commit_date)

    config.src_content.write(content)
    config.src_content.seek(0)

@depends(set_revision_info, replace_tokens)
def build():
    """Builds the final script and writes it to the disk.
    """
    for name in [config.project, config.full_name]:
        output = file('%s/%s.js' % (config.build_dir, name), 'w')
        output.writelines(config.src_content.readlines())

@depends(build)
def test():
    """Opens the test suite on a web browser.
    """
    prompt('web_browser', 'Please choose your web browser', \
            default='/usr/bin/firefox')
    local('$(web_browser) test/testSuite.html &')

@depends(build)
def doc():
    """Builds the documentation both in HTML and PDF.
    """
    local('cd $(doc_dir); make clean; make html; make latex')
    local('cd $(doc_dir)/_build/latex; make all-pdf')

@depends(build)
def pack():
    """Creates a minified version of the final script.
    """
    src = '%s/%s.js' % (config.build_dir, config.full_name)
    dst = '%s/%s-min.js' % (config.build_dir, config.full_name)
    local('cat %s | python lib/jsmin.py > %s' % (src, dst))
