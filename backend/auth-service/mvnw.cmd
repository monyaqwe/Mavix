@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.3.4
@REM
@REM Optional ENV vars
@REM -----------------
@REM   JAVA_HOME - location of a JDK home dir, required when download maven via java source
@REM   MVNW_REPOURL - repo url base for downloading maven distribution
@REM   MVNW_USERNAME/MVNW_PASSWORD - user and password for downloading maven
@REM   MVNW_VERBOSE - true: enable verbose log; debug: trace the mvnw script; others: silence the output
@REM ----------------------------------------------------------------------------

@if "%DEBUG%"=="" @echo off
@setlocal

set ERROR_CODE=0

@REM To isolate internal variables from possible wrapper scripts, we use a different prefix.
set "_WRAPPER_JAVA_HOME=%JAVA_HOME%"

@REM check JAVA_HOME and JAVACMD
if not "%_WRAPPER_JAVA_HOME%"=="" goto checkJavaHome
set "JAVACMD=java"
%JAVACMD% -version >nul 2>&1
if %errorlevel%==0 goto checkWrapperProperties
echo.
echo Error: JAVA_HOME is not defined correctly.
echo   We cannot execute %JAVACMD%
goto error

:checkJavaHome
if exist "%_WRAPPER_JAVA_HOME%\bin\java.exe" goto setJavaCmd
echo.
echo Error: JAVA_HOME is set to an invalid directory.
echo   JAVA_HOME = "%_WRAPPER_JAVA_HOME%"
echo   Please set the JAVA_HOME variable in your environment to match the
echo   location of your Java installation.
goto error

:setJavaCmd
set "JAVACMD=%_WRAPPER_JAVA_HOME%\bin\java.exe"

:checkWrapperProperties
set "WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%~dp0.mvn\wrapper\maven-wrapper.properties"

if exist "%WRAPPER_JAR%" goto runWrapper
if not exist "%WRAPPER_PROPERTIES%" (
  echo.
  echo Error: Could not find maven-wrapper.properties in %~dp0.mvn\wrapper
  goto error
)

@REM Download maven-wrapper.jar using PowerShell
echo.
echo Couldn't find %WRAPPER_JAR%, downloading it ...

powershell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $webClient = New-Object System.Net.WebClient; $webClient.DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.4/maven-wrapper-3.3.4.jar', '%WRAPPER_JAR%') }"
if %errorlevel% neq 0 (
  echo Error: Failed to download maven-wrapper.jar using PowerShell.
  goto error
)

:runWrapper
@REM Start Maven Wrapper
"%JAVACMD%" ^
  -classpath "%WRAPPER_JAR%" ^
  "-Dmaven.multiModuleProjectDirectory=%~dp0." ^
  org.apache.maven.wrapper.MavenWrapperMain ^
  %*

if %errorlevel% neq 0 set ERROR_CODE=%errorlevel%
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
