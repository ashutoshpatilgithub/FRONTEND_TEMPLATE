$env:DATABASE_URL="mongodb://127.0.0.1:27017/MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM?directConnection=true"
Set-Location backend
npx prisma studio --port 5555
