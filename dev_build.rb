# #Copyright (C) 2011 by Strobe Inc
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

require 'fileutils'
require 'pathname'
require 'optparse'

config = {}
argparser = OptionParser.new {|opts|

  config[:app_name] = 'circsim'
  opts.on('-a', '--application-name [name]', "The application name (required)"){|name|
    config[:app_name] = name
  }
  
  config[:build] = true
  opts.on('-n', '--no-build', "Do not run sc-build") {
    config[:build] = false
  }
  
  config[:source] = '.'
  opts.on('-s', '--source [directory]', "Source path (default: .)") {|source|
    config[:source] = source
  }
  
  config[:output] = '.'
  opts.on('-o', '--output [directory]', "Input path (default: www)") {|output|
    config[:output] = output
  }

  config[:mode] = 'production'
  opts.on('-M', '--mode [mode]', "Mode (default: production)") {|mode|
    config[:mode] = mode
  }
}
argparser.parse!

start_time = Time.now
puts "Starting at #{start_time.localtime}"


# Here's my autobuild script
`git checkout gh-pages`
`rm -rf index.html`
`rm -rf tmp`
`rm -rf static`
`git commit -am 'prep for autobuild'`
`git checkout master`
# End of first part of autobuild

config[:input] = File.join('tmp', 'build')
config[:source] = File.expand_path(config[:source])
config[:output] = File.expand_path(config[:output])


if config[:build] or not File.exists?(config[:input])
  build_bin   = File.join(config[:source], 'bin', 'sc-build')
  build_bin   = 'sc-build' unless File.exist?(build_bin)
  
  puts "Building: #{build_bin} #{config[:app_name]} -cr --languages=en --mode=#{config[:mode]}"
  
  FileUtils.rm_rf config[:input]
  `#{build_bin} #{config[:app_name]} -cr --languages=en --mode=#{config[:mode]}`
end

built_path = Dir[File.join(config[:input], 'static', config[:app_name])]

puts "Copying: #{config[:output]}"
FileUtils.rm_rf config[:output] + "/index.html"
FileUtils.rm_rf config[:output] + "/static/#{config[:app_name]}"
FileUtils.mkdir_p config[:output] + "/static/#{config[:app_name]}"
deployed_path = Dir[File.join(config[:output], 'static')]
FileUtils.cp_r built_path, deployed_path



puts "Cleanup"

app_path = Dir[File.join(config[:output], 'static', config[:app_name], 'en', '*')].first

['index.html', 'javascript-packed.js', 'stylesheet-packed.css'].each do |file_name|
  path = File.join(app_path, file_name)
  if File.exist?(path)
    data = File.read(path)
    data.gsub! /\/static\//, 'static/'
    File.open(path, 'w+'){|f| f.puts data }
  end
end

FileUtils.mv "#{app_path}/index.html", "#{config[:output]}/index.html"

# Second part of autobuild
`git checkout gh-pages`
`git add .`
`git commit -am 'autobuild #{Time.now.to_s}'`
`git push origin gh-pages`
`git checkout master`
# End of second part of autobuild

elapsed = Time.now - start_time
puts "Ready (took #{elapsed.to_i}s)"