require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


class CompanyController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;
    
            // Email validation using a simple regex
            const validEmail = await db.query(`SELECT * FROM company WHERE email = $1`, [email]);
            if (validEmail.rows.length > 0) {
                return res.status(400).json({ error: 'Comapny with this email already exists' });
            }
    
            const hashPassword = await bcrypt.hash(password, 10);
            const token = uuidv4();
            const newCompany = await db.query(
                `INSERT INTO company (email, password) VALUES ($1, $2) RETURNING *`,
                [email, hashPassword]
            );
    
            console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
            console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
    

            const accessToken = jwt.sign({ companyId: newCompany.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ companyId: newCompany.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });


            console.log("idcompany", newCompany.rows[0]);

            const newCompanyToken = await db.query(
                `INSERT INTO companytoken (idcompany, access, refresh) VALUES ($1, $2, $3) RETURNING *`,
                [newCompany.rows[0].idcompany, accessToken, refreshToken]
            );
    
            console.log(accessToken);
            return res.json({ idcompany: newCompany.rows[0].idcompany,email:newCompany.rows[0].email, accessToken, refreshToken });
        } catch (error) {
            // Handle errors appropriately (log, send error response, etc.)
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const validEmail = await db.query(`SELECT * FROM company WHERE email = $1`, [email]);
    
            if (validEmail.rows.length > 0) {
                const isPassEquals = await bcrypt.compare(password, validEmail.rows[0].password);
    
                if (!isPassEquals) {
                    return res.status(400).json({ error: 'Wrong password' });
                }
    
                const accessToken = jwt.sign({ companyId: validEmail.rows[0].id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ companyId: validEmail.rows[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
                const newCompanyToken = await db.query(
                    `UPDATE companytoken SET access = $2, refresh = $3 WHERE idcompany = $1 RETURNING *`,
                    [validEmail.rows[0].idcompany, accessToken, refreshToken]
                );
                
    
                if (!newCompanyToken.rows || newCompanyToken.rows.length === 0) {
                    return res.status(500).json({ error: 'Token insertion failed' });
                }
    
                return res.json({ idcompany: validEmail.rows[0].idcompany,email: validEmail.rows[0].email, accessToken, refreshToken });
            } else {
                return res.status(400).json({ error: 'Company with this email does not exist' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async refresh(req, res, next) {
        try {
            const { idCompany, refreshToken } = req.body;
    
            // Проверяем, существует ли пользователь с данным id
            const companyToken = await db.query(`SELECT * FROM companytoken WHERE idcompany = $1`, [idCompany]);
            if (companyToken.rows.length === 0) {
                return res.status(404).json({ error: 'Comapny token not found' });
            }
    
            // Проверяем, соответствует ли переданный accessToken тому, который есть в базе данных
            if (companyToken.rows[0].refresh !== refreshToken) {
                return res.status(401).json({ error: 'Invalid access token' });
            }
    
            // Создаем новый accessToken и refreshToken
            const newAccessToken = jwt.sign({ companyId: idCompany }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign({ companyId: idCompany }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    
            // Обновляем токены в базе данных
            const updatedCompanyToken = await db.query(
                `UPDATE companytoken SET access = $2, refresh = $3 WHERE idcompany = $1 RETURNING *`,
                [idCompany, newAccessToken, newRefreshToken]
            );
    
            if (!updatedCompanyToken.rows || updatedCompanyToken.rows.length === 0) {
                return res.status(500).json({ error: 'Token update failed' });
            }
    
            return res.json({idcomapny: idCompany, accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getOneCompany(req, res) {
        try {
            const { idcompany } = req.body;
            const company = await db.query(`SELECT idcompany, name, description, email FROM company WHERE idcompany = $1`, [idcompany]);
            res.json(company.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  updateCompanyInfo(req, res, next) {
        const { idCompany, name, description, email, password } = req.body;
        try {
            const hashPassword = await bcrypt.hash(password, 10);
    
            // Update company information
            const updatedCompany = await db.query(
                `UPDATE company SET name = $2, description = $3, email = $4, password = $5 WHERE idCompany = $1 RETURNING *`,
                [idCompany, name, description, email, hashPassword]
            );
    
            // Check if the update operation was successful
            if (!updatedCompany.rows || updatedCompany.rows.length === 0) {
                return res.status(404).json({ error: 'Company not found or update failed' });
            }
    
            // Generate new tokens
            const accessToken = jwt.sign({ companyId: updatedCompany.rows[0].idCompany }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ companyId: updatedCompany.rows[0].idCompany }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' });
    
            // Update tokens in the CompanyToken table
            const updateToken = await db.query(
                `UPDATE CompanyToken SET access = $2, refresh = $3 WHERE idCompany = $1 RETURNING *`,
                [updatedCompany.rows[0].idCompany, accessToken, refreshToken]
            );
    
            // Check if the token update operation was successful
            if (!updateToken.rows || updateToken.rows.length === 0) {
                return res.status(404).json({ error: 'Token update failed' });
            }
    
            // Return the updated company
            res.json(updatedCompany.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new CompanyController();
