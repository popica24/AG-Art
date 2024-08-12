FROM mcr.microsoft.com/dotnet/sdk:8.0 as build-env
WORKDIR /app

# Copy csproj files and restore dependencies
COPY AGART.Presentation.API/*.csproj ./
RUN dotnet restore

# Copy the entire solution
COPY . ./

# Publish both projects
WORKDIR /app

RUN dotnet publish AGART.Presentation.API/AGART.Presentation.API.csproj -c Release -o out/AGART.Presentation.API
RUN dotnet publish AGART.Application/AGART.Application.csproj -c Release -o out/AGART.Application
RUN dotnet publish AGART.Services/AGART.Services.csproj -c Release -o out/AGART.Services
RUN dotnet publish AGART.Domain/AGART.Domain.csproj -c Release -o out/AGART.Domain

# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:8.0 as final-env
WORKDIR /app
COPY --from=build-env /app/out/AGART.Presentation.API ./AGART.Presentation.API
COPY --from=build-env /app/out/AGART.Application ./AGART.Application
COPY --from=build-env /app/out/AGART.Services ./AGART.Services
COPY --from=build-env /app/out/AGART.Domain ./AGART.Domain

# Copy the JSON file from local machine to Docker container
COPY AGART.Presentation.API/agart-dev-firebase-adminsdk-skdlb-03bffeea89.json ./agart-dev-firebase-adminsdk-skdlb-03bffeea89.json
ENTRYPOINT [ "dotnet", "AGART.Presentation.API/AGART.Presentation.API.dll" ]
