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
  
  config[:output] = './build'
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

elapsed = Time.now - start_time
puts "Ready (took #{elapsed.to_i}s)"