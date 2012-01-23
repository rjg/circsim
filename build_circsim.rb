require 'fileutils'
require 'pathname'
require 'optparse'

require 'csv'
require 'iconv'

AK_FIXTURE_START = %Q(/*globals CoreCircsim */

sc_require('models/answer_key');

CoreCircsim.AnswerKey.FIXTURES = [

)

P_FIXTURE_START = %Q(/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

)

FIXTURE_END = "];"

counter = 0


procedures = Dir.glob("./design/procedures/**")
answerkey_output = AK_FIXTURE_START
procedure_output = P_FIXTURE_START


procedures.each do |procedure|
  
  answerkey_guids = []
  answerkey_csv = CSV.table("#{procedure}/answer_keys.csv")  
  answerkey_csv.each do |row|

    ary = row.to_csv.split(",")[-7..-1]
    ary.map!{|a| a.gsub(/\n/, '')}

    indices = []

    ary.each_with_index do |obj, i|
      indices.push(i) if obj != ""
    end


    vals = ary.keep_if{|a| a != ""}.join(", ")

    template = %Q({
    guid: #{counter}, 
    procedure: '#{procedure}', 
    column: #{row[:column]}, 
    isCorrect: #{row[:correct].upcase}, 
    highlights: [#{row[:highlights]}], 
    cells: #{indices.to_s}, 
    cellValues: [#{vals}], 
    category: "#{row[:category]}", 
    comment: "#{row[:comment]}"
  })

    template += "," unless row == answerkey_csv[-1]
    answerkey_guids.push(counter)
    counter +=1
    answerkey_output += template    
  end
  answerkey_output += "," unless procedure == procedures[-1]

  procedure_csv = CSV.table("#{procedure}/procedure.csv")
  procedure_csv = procedure_csv[0]

  template = %Q({
    guid: "#{procedure}",
    title: "#{procedure_csv[:title]}",
    introduction: "#{procedure_csv[:introduction]}",
    instructions: "Instructions go here.",
    isComplete: false,
    cols: ["DR", "RR", "SS"],
    rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
    key: [#{procedure_csv[:key]}],
    initialVariable: #{procedure_csv[:initial_variable]},
    initialVariableDirection: #{procedure_csv[:initial_variable_direction]},
    answerKeys: #{answerkey_guids},
    relationshipEvaluations: [{
      equation: [4, 2, 3],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: CO=SVxHR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: CO = HR X SV. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: CO=SVxHR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: CO=SVxHR. However, at this time we will move on."
    },
    {
      equation: [6, 4, 5],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: MAP = CO x TPR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: MAP = CO x TPR. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: MAP = CO x TPR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: MAP = CO x TPR. However, at this time we will move on."
    }]      
  })

  template += "," unless procedure == procedures[-1]
  
  procedure_output += template
  
end

answerkey_output += FIXTURE_END
procedure_output += FIXTURE_END

# Encoding fix
ic = Iconv.new('UTF-8//IGNORE', 'UTF-8')
answerkey_output = ic.iconv(answerkey_output + ' ')[0..-2]

ic = Iconv.new('UTF-8//IGNORE', 'UTF-8')
procedure_output = ic.iconv(procedure_output + ' ')[0..-2]


File.open("./frameworks/core_circsim/fixtures/procedure.js", "w") do |file|
  file << procedure_output
end

File.open("./frameworks/core_circsim/fixtures/answer_key.js", "w") do |file|
  file << answerkey_output
  file.set_encoding("UTF-8")
end

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
