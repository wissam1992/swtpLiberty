
FROM open-liberty:microProfile3

COPY --chown=1001:0 src/main/liberty/config/server.xml /config/

COPY --chown=1001:0 target/swtpLiberty.war /config/dropins/

ADD --chown=1001:0 https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.20/mysql-connector-java-8.0.20.jar /config/lib/mysql-connector-java-8.0.20.jar