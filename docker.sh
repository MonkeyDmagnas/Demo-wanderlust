#!bin/bash

sudo apt update
sudo apt install -y docker.io docker-compose

sudo usermod -aG docker $USER

sudo service docker start
sudo systemctl enable docker