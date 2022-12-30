
FROM maven:3.8.6-eclipse-temurin-17-alpine AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package


FROM amazoncorretto:17-alpine
COPY --from=build /home/app/target/iNutrix-0.0.1-SNAPSHOT.jar /usr/local/lib/iNutrix.jar
EXPOSE 3000
ENTRYPOINT ["java","-jar","/usr/local/lib/iNutrix.jar"]

