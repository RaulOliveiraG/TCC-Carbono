# Fase 1: Build
# Usamos a imagem oficial do SDK do .NET 8 para construir o projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copia os arquivos .sln e .csproj e restaura as depend�ncias primeiro
# Isso aproveita o cache do Docker. Se os projetos n�o mudarem, n�o baixa tudo de novo.
COPY *.sln .
COPY backend/CarbonCredit.AuthAPI/*.csproj ./backend/CarbonCredit.AuthAPI/
RUN dotnet restore "carbon-credit.sln"

# Copia o resto do c�digo-fonte do backend
COPY backend/. ./backend/

# Publica a aplica��o em modo Release, especificando o projeto e colocando o resultado na pasta /app/publish
RUN dotnet publish "backend/CarbonCredit.AuthAPI/CarbonCredit.AuthAPI.csproj" -c Release -o /app/publish --no-restore

# Fase 2: Runtime
# Usamos a imagem de runtime do ASP.NET, que � muito menor e mais segura
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Exp�e a porta que a aplica��o vai usar dentro do cont�iner
EXPOSE 8080

# Define o comando para iniciar a aplica��o
ENTRYPOINT ["dotnet", "CarbonCredit.AuthAPI.dll"]