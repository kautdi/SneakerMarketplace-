const db = require('../db');

class ZakazController {
    async getAllZakaz(req, res, next) {
        try {
            const { iduser, idCompany, status } = req.query; 
            let query = `
                SELECT 
                    zakaz.idzakaz,
                    zakaz.idUser,
                    zakaz.country,
                    zakaz.city,
                    zakaz.street,
                    zakaz.home,
                    zakaz.status,
                    Tovars.idtovar AS idtovar,
                    Tovars.name AS tovar_name,
                    Tovars.description AS tovar_description,
                    Tovars.img AS tovar_img,
                    Tovars.price AS tovar_price,
                    company.name AS company_name,
                    brands.name AS brand_name,
                    colors.color AS color_name,
                    sizes.size AS size_value
                FROM 
                    zakaz
                JOIN 
                    TovarsZakaz ON zakaz.idzakaz = TovarsZakaz.idzakaz
                JOIN 
                    tovars AS Tovars ON TovarsZakaz.idTovar = Tovars.idTovar
                JOIN 
                    company ON Tovars.idCompany = company.idCompany
                JOIN 
                    brands ON Tovars.idBrand = brands.idBrand
                JOIN 
                    colors ON TovarsZakaz.idColor = colors.idColor
                JOIN 
                    sizes ON TovarsZakaz.idSize = sizes.idSize
            `;
    
            if (iduser) {
                query += ` WHERE zakaz.idUser = ${iduser}`; // Filter by iduser if provided
            }
    
            if (idCompany) {
                query += ` AND company.idCompany = ${idCompany}`; // Filter by idCompany if provided
            }
    
            if (status) {
                query += ` AND zakaz.status = '${status}'`; // Filter by status if provided
            }
    
            const zakazs = await db.query(query);
            
            // Restructure data to group tovars by idzakaz
            const zakazsWithTovars = zakazs.rows.reduce((acc, curr) => {
                const {idtovar, tovar_name, tovar_description, tovar_img, tovar_price, company_name, brand_name, color_name, size_value, ...zakazInfo } = curr;
                if (!acc[curr.idzakaz]) {
                    acc[curr.idzakaz] = { ...zakazInfo, tovars: [] };
                }
                acc[curr.idzakaz].tovars.push({
                    idtovar,
                    tovar_name,
                    tovar_description,
                    tovar_img,
                    tovar_price,
                    company_name,
                    brand_name,
                    color_name,
                    size_value
                });
                return acc;
            }, {});
    
            return res.json(Object.values(zakazsWithTovars)); // Convert object back to array
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }
    async  createZakaz(req, res, next) {
        const { iduser, country, city, street, home, tovars } = req.body;
    
        try {
            // Создаем новый заказ
            const newZakazQuery = `
                INSERT INTO zakaz (idUser, country, city, street, home)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING idzakaz`;
            const newZakazValues = [iduser, country, city, street, home];
            const newZakazResult = await db.query(newZakazQuery, newZakazValues);
            const orderId = newZakazResult.rows[0].idzakaz;
    
            // Для каждого товара в массиве tovars вставляем запись в таблицу TovarsZakaz
            for (const tovar of tovars) {
                const { idTovar, idColor, idSize } = tovar;
                const newTovarZakazQuery = `
                    INSERT INTO TovarsZakaz (idzakaz, idTovar, idColor, idSize)
                    VALUES ($1, $2, $3, $4)`;
                const newTovarZakazValues = [orderId, idTovar, idColor, idSize];
                await db.query(newTovarZakazQuery, newTovarZakazValues);
            }
    
            res.status(201).json({ message: 'Zakazs created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  deleteZakaz(req, res, next) {
        const { idzakaz } = req.body;
        try {
            // First, delete entries in the TovarsZakaz table associated with the given idzakaz
            const deleteTovarsZakazQuery = `
                DELETE FROM TovarsZakaz
                WHERE idzakaz = $1
            `;
            await db.query(deleteTovarsZakazQuery, [idzakaz]);
    
            // Then, delete the order entry from the zakaz table
            const deleteZakazQuery = `
                DELETE FROM zakaz
                WHERE idzakaz = $1
            `;
            await db.query(deleteZakazQuery, [idzakaz]);
    
            res.status(200).json({ message: 'Zakaz deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  getTovarsByUserId(req, res, next) {
        try {
            const { iduser } = req.query;
            let query = `
                SELECT 
                    Tovars.idtovar AS idtovar,
                    Tovars.name AS tovar_name,
                    Tovars.description AS tovar_description,
                    Tovars.img AS tovar_img,
                    Tovars.price AS tovar_price,
                    company.name AS company_name,
                    brands.name AS brand_name,
                    colors.color AS color_name,
                    sizes.size AS size_value
                FROM 
                    zakaz
                JOIN 
                    TovarsZakaz ON zakaz.idzakaz = TovarsZakaz.idzakaz
                JOIN 
                    tovars AS Tovars ON TovarsZakaz.idTovar = Tovars.idTovar
                JOIN 
                    company ON Tovars.idCompany = company.idCompany
                JOIN 
                    brands ON Tovars.idBrand = brands.idBrand
                JOIN 
                    colors ON TovarsZakaz.idColor = colors.idColor
                JOIN 
                    sizes ON TovarsZakaz.idSize = sizes.idSize
                WHERE 
                    zakaz.idUser = $1
            `;
    
            const tovars = await db.query(query, [iduser]);
    
            return res.json(tovars.rows);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    

}

module.exports = new ZakazController();