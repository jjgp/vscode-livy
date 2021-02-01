FROM openjdk:8 as spark-base

RUN wget https://downloads.apache.org/spark/spark-3.0.1/spark-3.0.1-bin-hadoop2.7.tgz
RUN tar xvf spark-3.0.1-bin-hadoop2.7.tgz
RUN mv spark-3.0.1-bin-hadoop2.7/ /usr/local/spark

ENV PATH="${PATH}:/usr/local/spark/bin"
ENV SPARK_HOME=/usr/local/spark

FROM spark-base

RUN wget https://downloads.apache.org/incubator/livy/0.7.0-incubating/apache-livy-0.7.0-incubating-bin.zip
RUN unzip apache-livy-0.7.0-incubating-bin.zip
RUN mv apache-livy-0.7.0-incubating-bin/ /usr/local/livy
RUN mkdir /usr/local/livy/logs

ENV PATH="${PATH}:/usr/local/livy/bin"

ENTRYPOINT livy-server
