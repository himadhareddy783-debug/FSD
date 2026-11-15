import http from 'http';

const faculty = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // POST - Add Faculty
    if (method === 'POST' && url === '/faculty') {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newFaculty = JSON.parse(body);
            faculty.push(newFaculty);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Faculty added successfully",
                data: newFaculty
            }));
        });
    }

    // GET - Get All Faculty
    else if (method === 'GET' && url === '/faculty') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Faculty retrieved successfully",
            data: faculty
        }));
    }

    // GET - Get Faculty by ID
    else if (method === 'GET' && url.startsWith('/faculty/')) {
        const facultyId = parseInt(url.split('/')[2]);

        const facultyMember = faculty.find(f => f.id === facultyId);

        if (facultyMember) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Faculty retrieved successfully",
                data: facultyMember
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "Faculty not found"
            }));
        }
    }

    // PUT - Update Faculty
    else if (method === 'PUT' && url.startsWith('/faculty/')) {
        const facultyId = parseInt(url.split('/')[2]);

        let body = "";

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            let updatedFaculty;

            try {
                updatedFaculty = JSON.parse(body);
            } catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: "Request body must contain valid JSON"
                }));
                return;
            }

            const facultyIndex = faculty.findIndex(f => f.id === facultyId);

            if (facultyIndex !== -1) {
                faculty[facultyIndex] = updatedFaculty;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: "Faculty updated successfully",
                    data: updatedFaculty
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: "Faculty not found"
                }));
            }
        });
    }

    // DELETE - Delete Faculty
    else if (method === 'DELETE' && url.startsWith('/faculty/')) {
        const facultyId = parseInt(url.split('/')[2]);

        const facultyIndex = faculty.findIndex(f => f.id === facultyId);

        if (facultyIndex !== -1) {
            const deletedFaculty = faculty.splice(facultyIndex, 1);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Faculty deleted successfully",
                data: deletedFaculty[0]
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: "Faculty not found"
            }));
        }
    }

    // Invalid Route
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/");
});