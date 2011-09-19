config :all, :required => [:sproutcore, :twitter_bootstrap, :core_circsim]

# THEME
config :corephysio do |c|
  c[:required] = 'sproutcore/empty_theme'
  c[:theme_name] = 'corephysio'
end

config :core_circsim do |c|
  c[:load_fixtures] = true
end


config :circsim do |c|
  c[:theme] = 'corephysio'
  c[:required] = 'twitter_bootstrap'
end 


