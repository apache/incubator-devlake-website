FROM gitpod/workspace-full:latest

RUN brew install nvm 
RUN nvm install v10.23.1
