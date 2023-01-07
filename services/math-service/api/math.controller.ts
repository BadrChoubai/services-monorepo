import { Router } from 'express';
import { mathService } from "./math.service";

const mathController = Router();

mathController.post<{
    op: string,
    numbers: number[]
}, {
    message: string,
    operation: string,
    result: number
}>("/", async function (req, res) {
    const { op, numbers } = JSON.parse(req.body);
    let result;
    switch (op) {
        case "addition":
            result = mathService.add(numbers)
            break;
        case "subtraction":
            result = mathService.subtract(numbers)
            break;
        case "multiplication":
            result = mathService.multiply(numbers)
            break;
        case "division":
            result = mathService.divide(numbers)
            break;
        default:
            result = NaN
            break;
    }
    
    res.send({
        message: `Calculation Finished`,
        operation: op,
        result,
    })
})

export default mathController;
