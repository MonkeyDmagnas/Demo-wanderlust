#!/bin/bash

# Install Docker
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker

# Install Kubernetes
sudo apt-get install -y kubeadm
sudo kubeadm init --apiserver-advertise-address=192.168.50.10 --pod-network-cidr=10.244.0.0/16
