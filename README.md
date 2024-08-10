# How to build the application

# Build frontend

cd spotilike-frontend

docker build -t spotilike-frontend .

docker run -it -p 8080:8080 --rm --name container-name spotilike-frontend

# Build backend

cd backend-frontend

docker build -t spotilike-backend .

docker run -it -p 8889:8889 --rm --name container-name spotilike-frontend

# Launch via Docker Desktop

cd ..

docker-compose up -d

# Deploy via ansible

ansible-playbook deploy_spotilike.yml

# Deploy with teraform

terraform init

terraform Apply