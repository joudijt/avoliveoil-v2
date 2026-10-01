# Apache harness (local only)
docker build -t avo-apache server-harness
docker run -d --name avo-apache -p 8095:80 -v E:/avoliveoil-v2/dist:/home/madinahcom/avoliveoil.com avo-apache
Data dir lives inside the container at /home/madinahcom/avoliveoil-cms (fresh per container).
