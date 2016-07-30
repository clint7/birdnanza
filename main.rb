require 'sinatra'

class MainApp < Sinatra::Base

  get '/' do
    send_file File.join('public', '/index.html')
  end
end