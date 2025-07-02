const resumeModel = require("../models/Resume.Model")
const Razorpay = require("razorpay");


const fetchResume = async (req, res) => {
    const { userID } = req
    console.log(req.userID)
    try {
        let allResume = await resumeModel.find({ userID })
        res.send({ success: "true", msg: "All User's Resume fetch successfully", data: allResume })

    } catch (error) {
        console.error("Error fetching resume:", error.message);
        res.status(500).send({
            msg: "Something went wrong while fetching the resumes. Please try again later.",
            error: error.message
        });
    }
}

const fetchSingleResume = async (req, res) => {
    const { userID, query: { id } } = req
    console.log(id)
    try {
        let singleResume = await resumeModel.find({ _id: id })
        res.send({ success: "true", msg: "SingleResume fetch successfully", data: singleResume })

    } catch (error) {
        console.error("Error fetching resume:", error.message);
        res.status(500).send({
            msg: "Something went wrong while fetching the single resumes. Please try again later.",
            error: error.message
        });
    }
}

const createResume = async (req, res) => {
    let { userID } = req
    console.log("create resume", req.body, userID)
    try {
        let newResume = await resumeModel({ ...req.body, userID })
        let resumeSaved = await newResume.save()
        console.log("resume created successfully")
        res.send({ msg: "resume created successfully" })

    } catch (error) {
        console.log("resume is not created", error.message)
        res.send({ msg: "resume is not created" })
    }
}

const updateResume = async (req, res) => {
    //  const { id } = req.params;
    const { _id, ...updateData } = req.body;
    try {
        console.log(req.body, "Update Resume")
        let prevResume = await resumeModel.findByIdAndUpdate(_id, updateData, { new: true })

        res.send({ msg: "Updated Resume", data: prevResume })
    } catch (error) {
        console.log("something went wrong, resume is not updated", error)

        res.send({ msg: "something went wrong, resume is not updated", })
    }
}

const deleteResume = async (req, res) => {
    const { id } = req.params;
    try {
        let prevResume = await resumeModel.findByIdAndDelete(id)
        console.log("Deleted Resume")

        res.send({ msg: "Deleted Resume", })
    } catch (error) {
        console.log("something went wrong, resume is not deleted", error)

        res.send({ msg: "something went wrong, resume is not deleted", })
    }
}

const razerPayment = async (req, res) => {

    const razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    const { amount } = req.body;
    const options = {
        amount: amount,
        currency: "INR",
        receipt: "receipt#1"
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { fetchResume, createResume, updateResume, fetchSingleResume, deleteResume, razerPayment }