# Local Apache harness for the CMS (docs/cms/CMS-SPEC.md §13.7). NOT deployed.
# Mirrors the live host closely enough to test .htaccess routing + serve.php:
# PHP 8.4, pdo_sqlite, gd with webp, mod_rewrite/headers/expires/deflate, AllowOverride All.
FROM php:8.4-apache
RUN apt-get update && apt-get install -y --no-install-recommends libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev \
 && docker-php-ext-configure gd --with-jpeg --with-webp \
 && docker-php-ext-install gd \
 && a2enmod rewrite headers expires deflate \
 && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf \
 && rm -rf /var/lib/apt/lists/*
# docroot = /home/madinahcom/avoliveoil.com like production, data dir one level up
RUN mkdir -p /home/madinahcom/avoliveoil.com /home/madinahcom/avoliveoil-cms \
 && chown -R www-data:www-data /home/madinahcom \
 && sed -i 's#/var/www/html#/home/madinahcom/avoliveoil.com#g' /etc/apache2/sites-available/000-default.conf \
 && printf '<Directory /home/madinahcom/avoliveoil.com>\n  AllowOverride All\n  Require all granted\n</Directory>\n' > /etc/apache2/conf-enabled/docroot.conf
ENV AVO_CMS_MAIL=file
RUN echo 'variables_order = "EGPCS"' > /usr/local/etc/php/conf.d/env.ini && echo 'upload_max_filesize=64M\npost_max_size=64M\nmemory_limit=512M' > /usr/local/etc/php/conf.d/limits.ini
