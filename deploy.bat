@echo off
setlocal
cd /d "%~dp0"
echo === 任务农场 Deploy (farm repo) ===
echo Repo: %CD%
echo.
where git >nul 2>nul
if %errorlevel%==0 goto have_git
for /d %%i in ("%LocalAppData%\GitHubDesktop\app-*") do (
  if exist "%%i\resources\app\git\cmd\git.exe" set "PATH=%%i\resources\app\git\cmd;%PATH%"
)
where git >nul 2>nul
if %errorlevel%==0 goto have_git
if exist "C:\Program Files\Git\cmd\git.exe" set "PATH=C:\Program Files\Git\cmd;%PATH%"
where git >nul 2>nul
if %errorlevel%==0 goto have_git
echo ERROR: 找不到 git。请装 Git for Windows，或用 GitHub Desktop 提交推送。
pause
exit /b 1

:have_git
git status --short
echo.
set /p MSG="Commit message (Enter for default): "
if "%MSG%"=="" set MSG=Update farm (%date% %time%)
git add -A
git commit -m "%MSG%"
git push
if errorlevel 1 (
  echo.
  echo Push 失败。若是第一次：请先在 github.com 建好仓库 farm，并按 README 里的命令 init + remote add + push。
  pause
  exit /b 1
)
echo.
echo === Done === 等 1-2 分钟：https://xijie2013.github.io/farm/
pause
