const db = require('../db');

class TovarsController {
    async getAllTovars(req, res) {
        try {
            const { sizes, brands, idcompanys, colors, name, price } = req.query;
            const filters = [];
            
            if (sizes) filters.push(`s.size IN (${sizes})`);
            if (brands) filters.push(`b.idBrand IN (${brands})`);
            if (idcompanys) filters.push(`t.idCompany = ${idcompanys}`);
            if (colors) filters.push(`c.color IN ('${colors.join("','")}')`);
            if (name) filters.push(`t.name ILIKE '%${name}%'`); // Filtering by name
            
            let query = `
                SELECT 
                    t.idTovar, 
                    t.idCompany, 
                    t.name, 
                    t.description, 
                    t.idBrand, 
                    t.img, 
                    t.price, 
                    json_agg(DISTINCT s.size) AS sizes, 
                    b.name AS brand_name, 
                    json_agg(DISTINCT c.color) AS colors, 
                    co.name AS company_name 
                FROM 
                    tovars t
                LEFT JOIN 
                    TovarsSize ts ON t.idTovar = ts.idTovar
                LEFT JOIN 
                    sizes s ON ts.idSize = s.idSize
                LEFT JOIN 
                    TovarsColor tc ON t.idTovar = tc.idTovar
                LEFT JOIN 
                    colors c ON tc.idColor = c.idColor
                LEFT JOIN 
                    brands b ON t.idBrand = b.idBrand
                LEFT JOIN 
                    company co ON t.idCompany = co.idCompany
            `;
            
            if (filters.length > 0) {
                query += ` WHERE ${filters.join(' AND ')}`;
            }
        
            query += ` GROUP BY t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, b.name, co.name`;
        
            if (price) {
                filters.push(`t.price >= ${price}`);
                query += ` HAVING t.price >= ${price}`;
            }
        
            query += ` ORDER BY t.price`;
        
            const tovars = await db.query(query);
            console.log(query);
            return res.json(tovars.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  getOneTovar(req, res) {
        const { idTovar } = req.body;
        try {
            const tovar = await db.query(`
                SELECT 
                    t.idTovar, 
                    t.idCompany, 
                    t.name, 
                    t.description, 
                    t.idBrand, 
                    t.price,
                    t.img, 
                    json_agg(DISTINCT s.size) AS sizes, 
                    b.name AS brand_name, 
                    json_agg(DISTINCT c.color) AS colors, 
                    co.name AS company_name 
                FROM 
                    tovars t
                LEFT JOIN 
                    TovarsSize ts ON t.idTovar = ts.idTovar
                LEFT JOIN 
                    sizes s ON ts.idSize = s.idSize
                LEFT JOIN 
                    TovarsColor tc ON t.idTovar = tc.idTovar
                LEFT JOIN 
                    colors c ON tc.idColor = c.idColor
                LEFT JOIN 
                    brands b ON t.idBrand = b.idBrand
                LEFT JOIN 
                    company co ON t.idCompany = co.idCompany
                WHERE 
                    t.idTovar = $1
                GROUP BY 
                    t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, b.name, co.name;
            `, [idTovar]);
            console.log(tovar)
            
            if (tovar.rows.length === 0) {
                return res.status(404).json({ error: 'Tovar not found' });
            }
            
            return res.json(tovar.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getOneCompanyTovar(req,res){
        const { idCompany } = req.body;
        try {
            const tovar = await db.query(`
                SELECT 
                    t.idTovar, 
                    t.idCompany, 
                    t.name, 
                    t.description, 
                    t.idBrand, 
                    t.img, 
                    t.price,
                    json_agg(DISTINCT s.size) AS sizes, 
                    b.name AS brand_name, 
                    json_agg(DISTINCT c.color) AS colors, 
                    co.name AS company_name 
                FROM 
                    tovars t
                LEFT JOIN 
                    TovarsSize ts ON t.idTovar = ts.idTovar
                LEFT JOIN 
                    sizes s ON ts.idSize = s.idSize
                LEFT JOIN 
                    TovarsColor tc ON t.idTovar = tc.idTovar
                LEFT JOIN 
                    colors c ON tc.idColor = c.idColor
                LEFT JOIN 
                    brands b ON t.idBrand = b.idBrand
                LEFT JOIN 
                    company co ON t.idCompany = co.idCompany
                WHERE 
                    t.idCompany = $1
                GROUP BY 
                    t.idTovar, t.idCompany, t.name, t.description, t.idBrand, t.img, b.name, co.name;
            `, [idCompany]);
            console.log(tovar)
            
            if (tovar.rows.length === 0) {
                return res.status(404).json({ error: 'Tovar not found' });
            }
            
            return res.json(tovar.rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllSize(req, res) {
        try {
            const sizes = await db.query(`
                SELECT 
                    s.idSize, 
                    s.size
                FROM 
                    sizes s;
            `);
            console.log(sizes)
            
            if (sizes.rows.length === 0) {
                return res.status(404).json({ error: 'Size not found' });
            }
            
            return res.json(sizes.rows);
        }
        catch{
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllColor(req, res) {
        try {
            const colors = await db.query(`
                SELECT 
                    c.idColor, 
                    c.color
                FROM 
                    colors c;
            `);
            console.log(colors)
            
            if (colors.rows.length === 0) {
                return res.status(404).json({ error: 'Color not found' });
            }
            
            return res.json(colors.rows);
        }
        catch{
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllBrands(req, res) {
        try {
            const brands = await db.query(`
                SELECT 
                    b.idBrand, 
                    b.name
                FROM 
                    brands b;
            `);
            console.log(brands)
            
            if (brands.rows.length === 0) {
                return res.status(404).json({ error: 'Brand not found' });
            }
            
            return res.json(brands.rows);
        }
        catch(error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  createTovars(req, res) {
        const { idCompany, name, description, idbrand, img, price, color, sizes } = req.body;
    
        try {
            // Insert into tovars table
            const newTovarQuery = `
                INSERT INTO tovars (idCompany, name, description, img, idBrand, price)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING idTovar`;
            const newTovarValues = [idCompany, name, description, img, idbrand, price];
            const newTovarResult = await db.query(newTovarQuery, newTovarValues);
            const newTovarId = newTovarResult.rows[0].idTovar;
    
            // Insert into TovarsSize table
            for (const size of sizes) {
                const newSizeQuery = `
                    INSERT INTO TovarsSize (idTovar, idSize)
                    VALUES ($1, $2)`;
                const newSizeValues = [newTovarId, size];
                await db.query(newSizeQuery, newSizeValues);
            }
    
            // Insert into TovarsColor table
            for (const clr of color) {
                const newColorQuery = `
                    INSERT INTO TovarsColor (idTovar, idColor)
                    VALUES ($1, $2)`;
                const newColorValues = [newTovarId, clr];
                await db.query(newColorQuery, newColorValues);
            }
    
            res.status(201).json({ message: 'Tovars created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  updateTovars(req, res) {
        const { idTovar } = req.body;
        const { idCompany, name, description, idbrand, img, price, color, sizes } = req.body;
    
        try {
            // Update tovars table
            const updateTovarQuery = `
                UPDATE tovars
                SET idCompany = $1, name = $2, description = $3, img = $4, idBrand = $5, price = $6
                WHERE idTovar = $7`;
            const updateTovarValues = [idCompany, name, description, img, idbrand, price, idTovar];
            await db.query(updateTovarQuery, updateTovarValues);
    
            // Update TovarsSize table
            // First, delete existing records
            const deleteSizeQuery = `
                DELETE FROM TovarsSize
                WHERE idTovar = $1`;
            await db.query(deleteSizeQuery, [idTovar]);
            // Then, insert new records
            for (const size of sizes) {
                const newSizeQuery = `
                    INSERT INTO TovarsSize (idTovar, idSize)
                    VALUES ($1, $2)`;
                const newSizeValues = [idTovar, size];
                await db.query(newSizeQuery, newSizeValues);
            }
    
            // Update TovarsColor table
            // First, delete existing records
            const deleteColorQuery = `
                DELETE FROM TovarsColor
                WHERE idTovar = $1`;
            await db.query(deleteColorQuery, [idTovar]);
            // Then, insert new records
            for (const clr of color) {
                const newColorQuery = `
                    INSERT INTO TovarsColor (idTovar, idColor)
                    VALUES ($1, $2)`;
                const newColorValues = [idTovar, clr];
                await db.query(newColorQuery, newColorValues);
            }
    
            res.status(200).json({ message: 'Tovars updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async  deleteTovars(req, res) {
        const { idTovar } = req.body;
    
        try {
            // Delete from TovarsColor table
            const deleteColorsQuery = `
                DELETE FROM TovarsColor
                WHERE idTovar = $1`;
            await db.query(deleteColorsQuery, [idTovar]);
    
            // Delete from TovarsSize table
            const deleteSizesQuery = `
                DELETE FROM TovarsSize
                WHERE idTovar = $1`;
            await db.query(deleteSizesQuery, [idTovar]);
    
            // Delete from tovars table
            const deleteTovarQuery = `
                DELETE FROM tovars
                WHERE idTovar = $1`;
            await db.query(deleteTovarQuery, [idTovar]);
    
            res.status(200).json({ message: 'Tovars deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new TovarsController();