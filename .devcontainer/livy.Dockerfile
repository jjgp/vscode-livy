FROM maven:3-openjdk-8 as builder

# dependencies of the livy python-api package
RUN apt-get update && apt-get -y install \
    python-pip \
    python-setuptools \
    && python -m pip install virtualenv \
    && virtualenv venv

# https://github.com/apache/incubator-livy/tree/4d8a912699683b973eee76d4e91447d769a0cb0d
RUN wget -O 0.8.0-incubating-4d8a912.zip \
    https://github.com/apache/incubator-livy/archive/4d8a912699683b973eee76d4e91447d769a0cb0d.zip \
    && unzip 0.8.0-incubating-4d8a912.zip \
    && cd /incubator-livy-4d8a912699683b973eee76d4e91447d769a0cb0d \
    && mvn package -DskipTests \
        -DskipITs \
        -Dmaven.javadoc.skip=true \
        -Pspark-3.0 \
        -Pthriftserver \
    && cp /incubator-livy-4d8a912699683b973eee76d4e91447d769a0cb0d/assembly/target/apache-livy-0.8.0-incubating-SNAPSHOT-bin.zip /

FROM openjdk:8-jdk-slim

LABEL maintainer="Jason Prasad <jasongprasad@gmail.com>"

COPY --from=builder /apache-livy-0.8.0-incubating-SNAPSHOT-bin.zip /

RUN apt-get update && apt-get -y install --no-install-recommends \
    unzip \
    wget \
    && rm -rf /var/lib/apt/lists/*

# livy
RUN unzip apache-livy-0.8.0-incubating-SNAPSHOT-bin.zip \
    && mv apache-livy-0.8.0-incubating-SNAPSHOT-bin /usr/local/livy \
    && mkdir /usr/local/livy/logs \
    && rm apache-livy-0.8.0-incubating-SNAPSHOT-bin.zip

# spark
RUN wget https://archive.apache.org/dist/spark/spark-3.0.0/spark-3.0.0-bin-hadoop2.7.tgz \
    && tar xvf spark-3.0.0-bin-hadoop2.7.tgz \
    && mv spark-3.0.0-bin-hadoop2.7/ /usr/local/spark \
    && rm spark-3.0.0-bin-hadoop2.7.tgz

ENV PATH="${PATH}:/usr/local/livy/bin"
ENV PATH="${PATH}:/usr/local/spark/bin"
ENV SPARK_HOME=/usr/local/spark

ENTRYPOINT livy-server
