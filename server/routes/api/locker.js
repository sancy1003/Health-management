import express from 'express';
import Locker from '../../models/locker'

const router = express.Router();


// 모든 락커 조회
router.get('/', async (req, res) => {
    try {
        const lockers = await Locker.find();
        if(!lockers) throw Error("No lockers");
        res.status(200).json(lockers);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// 락커 생성
router.post("/", async (req, res) => {
    try{
        const { createNumber, branch_office } = req.body;
        const existingLocker = await Locker.find({
            branch_office: branch_office,
        });

        // 락커룸이 없는 경우
        if(existingLocker.length === 0) {
            for(let number = 1; number < createNumber + 1; number++) {
                const newLocker = new Locker({
                    number,
                    branch_office,
                });

                newLocker.save();
            }
        } else { // 락커룸이 존재하고 추가하는 경우
            for (let i = 1; i < createNumber + 1; i++) {
                let number = existingLocker.length + i;
                const newLocker = new Locker({
                    number,
                    branch_office,
                });

                newLocker.save();
            }
        }

        res.status(200).json({msg: "락커 생성 성공"});
    } catch(e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// 락커 삭제
router.delete("/", async (req, res) => {
    try {
        const { deleteNumber, branch_office} = req.body;
        const existingLocker = await Locker.find({
            branch_office: branch_office,
        });
        if(existingLocker.length >= deleteNumber) {
            for(let i = 0; i < deleteNumber; i++) {
                await Locker.deleteMany({
                    number: (existingLocker.length - i),
                    branch_office: branch_office,
                });
            }            
            res.status(200).json({msg: "락커 삭제 성공"});
        }else {        
            res.status(200).json({msg: "생성된 락커 숫자보다 삭제하려는 락커 숫자가 많습니다."});
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
})

export default router;