import express from 'express';

const app = express();

app.use(express.json());

const faculty = [];

// CREATE faculty
app.post("/api/v1/faculty", (req, res) => {
    const newFaculty = req.body;
    faculty.push(newFaculty);

    res.status(201).json({
        message: "Faculty member created successfully",
        data: newFaculty
    });
});

// GET all faculty
app.get("/api/v1/faculty", (req, res) => {
    res.status(200).json({
        message: "Data of faculty members fetched successfully",
        data: faculty
    });
});

// GET faculty by ID
app.get("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);

    const facultyMember = faculty.find(
        (fac) => fac.id === facultyId
    );

    if (facultyMember) {
        res.status(200).json({
            message: "Faculty member details fetched successfully",
            data: facultyMember
        });
    } else {
        res.status(404).json({
            message: "Faculty member not found"
        });
    }
});

// UPDATE faculty by ID
app.put("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);
    const updateFaculty = req.body;

    const facultyIndex = faculty.findIndex(
        (fac) => fac.id === facultyId
    );

    if (facultyIndex !== -1) {
        faculty[facultyIndex] = {
            ...faculty[facultyIndex],
            ...updateFaculty
        };

        res.status(200).json({
            message: "Faculty member updated successfully",
            data: faculty[facultyIndex]
        });
    } else {
        res.status(404).json({
            message: "Faculty member not found"
        });
    }
});

// DELETE faculty by ID
app.delete("/api/v1/faculty/:id", (req, res) => {
    const facultyId = parseInt(req.params.id);

    const facultyIndex = faculty.findIndex(
        (fac) => fac.id === facultyId
    );

    if (facultyIndex !== -1) {
        const deletedFaculty = faculty.splice(facultyIndex, 1)[0];

        res.status(200).json({
            message: "Faculty member deleted successfully",
            data: deletedFaculty
        });
    } else {
        res.status(404).json({
            message: "Faculty member not found"
        });
    }
});
app.listen(4000,() =>{
    console.log("Server is running on http;//localhost:4000/api/v1/faculty");
});
