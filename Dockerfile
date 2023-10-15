FROM node:14.15.1-alpine as frontend_build
WORKDIR /app
COPY /frontend/package.json package.json
COPY /frontend/package-lock.json package-lock.json
RUN npm install --silent
COPY /frontend/ .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 as backend_build
WORKDIR /app
COPY /backend/*.sln ./
COPY /backend/backend/*.csproj ./backend/
COPY /backend/skindata/*.csproj ./skindata/
COPY /backend/utils/maint/*.csproj ./utils/maint/
RUN dotnet restore

COPY /backend/backend ./backend/
COPY /backend/skindata ./skindata/
COPY /backend/utils/maint ./utils/maint/
RUN dotnet publish -c Release -o out

RUN mv ./backend/Bases out/Bases
RUN mv ./backend/Scenes out/Scenes
RUN mv ./backend/Vistas out/Vistas

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as final_image
COPY --from=backend_build /app/out /skinchecker
COPY --from=frontend_build /app/build /skinchecker/wwwroot
WORKDIR /skinchecker
EXPOSE 80
ENTRYPOINT ["dotnet", "backend.dll"]