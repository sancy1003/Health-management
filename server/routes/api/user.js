import express from 'express';
import User from '../../models/user'

const router = express.Router();


// 모든 사용자 조회

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if(!users) throw Error("No users");
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// 사용자 등록
router.post("/", (req, res) => {
    const { name, id, password, branch_office } = req.body;

    // 빈칸 입력 확인
    if (!name || !id || !password || !branch_office) {
        return res.status(400).json({ msg: "빈칸을 모두 채워주세요."});
    }

    // 유저 id 중복 조회
    User.findOne({ id }).then((user) => {
        if(user) return res.status(400).json({ msg: "사용중인 아이디입니다."});

        const newUser = new User({
            name,
            id,
            password,
            branch_office
        });

        newUser.save().then((user) => {
            res.json({
                user: {
                    name: user.name,
                    id: user.id,
                    password: user.password,
                    branch_office: user.branch_office,
                }
            });
        });
    });
});

export default router;