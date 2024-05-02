FROM python:3.11

RUN apt-get update -qq && apt-get install -y locales

# установка локали, чтобы использовать русский в консоли внутри контейнера
RUN echo "ru_RU.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen ru_RU.UTF-8 && \
  /usr/sbin/update-locale LANG=ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

ENV APP_PATH=/usr/src
WORKDIR $APP_PATH

RUN pip install drf-yasg

COPY . .

# сообщаем другим разработчикам и devopsам о том, на каком порту работает наше приложение
EXPOSE 8000

# устанавливаем команду по умолчанию
CMD ["python", "manage.py", "runserver", "0:8000"]