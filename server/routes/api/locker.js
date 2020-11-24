import express from 'express';
import Locker from '../../models/locker'

const router = express.Router();


// 모든 락커 조회
router.get('/:branchOffice', async (req, res) => {
    try {
        const lockers = await Locker.find({
            branch_office: req.params.branchOffice,
        }).sort({
            number:1,
        });
        if(!lockers) throw Error("No lockers");
        res.status(200).json(lockers);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// 락커 생성
router.post("/", async (req, res) => {
    try{
        let { createNumber, branchOffice } = req.body;

        if(createNumber <= 0 || createNumber == null) {
            return res.status(400).json({ msg: "올바른 값을 입력해주세요." });
        }

        createNumber = parseInt(createNumber);

        const existingLocker = await Locker.find({
            branch_office: branchOffice,
        });

        // 락커룸이 없는 경우
        if(existingLocker.length === 0) {
            for(let number = 1; number < createNumber + 1; number++) {
                const newLocker = new Locker({
                    number,
                    branch_office: branchOffice,
                });

                await newLocker.save();
            }
        } else { // 락커룸이 존재하고 추가하는 경우
            for (let i = 1; i < createNumber + 1; i++) {
                let number = existingLocker.length + i;
                const newLocker = new Locker({
                    number,
                    branch_office: branchOffice,
                });

                await newLocker.save();
            }
        }
        res.status(200).json({ msg: "총 락커 수 : " + existingLocker + createNumber });
    } catch(e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// 락커 삭제
router.delete("/:branchOffice/:deleteNumber", async (req, res) => {
    try {
        let { branchOffice, deleteNumber } = req.params;

        if(deleteNumber <= 0 || deleteNumber == "") {
            return res.status(400).json({ msg: "올바른 값을 입력해주세요." });
        }

        deleteNumber = parseInt(deleteNumber);

        const existingLocker = await Locker.find({
            branch_office: branchOffice,
        });

        if(existingLocker.length >= deleteNumber) {
            for(let i = 0; i < deleteNumber; i++) {
                await Locker.deleteOne({
                    number: (existingLocker.length - i),
                    branch_office: branchOffice,
                });
            }
            res.status(200).json({ msg: "총 락커 수 : " + existingLocker + deleteNumber });
        }else {        
            res.status(400).json({ msg: "삭제하려는 라커가 생성된 라커보다 많습니다" });
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
})

export default router;