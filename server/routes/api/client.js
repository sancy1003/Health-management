import express from 'express';
import Client from '../../models/client'

const router = express.Router();


// 모든 고객 조회

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        if(!clients) throw Error("No clients");
        res.status(200).json(clients);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// 고객 등록
router.post("/", (req, res) => {
    const { name, phone, register_date, expiration_date } = req.body;

    // 빈칸 입력 확인
    if (!name || !phone || !register_date || !expiration_date) {
        return res.status(400).json({ msg: "내용을 입력해주세요."});
    }

    // 유저 중복 조회
    Client.findOne({ phone }).then((client) => {
        if(client) return res.status(400).json({ msg: "사용중인 아이디입니다."});

        const newClient = new Client({
            name,
            phone,
            register_date,
            expiration_date
        });

        newClient.save().then((client) => {
            res.json({
                client: {
                    name: client.name,
                    phone: client.phone,
                    register_date: client.register_date,
                    expiration_date: client.expiration_date,
                }
            });
        });
    });
});

export default router;