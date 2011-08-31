config :all, :required => [:sproutcore, :core_circsim]

# THEME
config :corephysio do |c|
  c[:required] = 'sproutcore/empty_theme'
  c[:theme_name] = 'corephysio'
  c[:load_fixtures] = true    
end


config :circsim,
  :theme => 'corephysio'


