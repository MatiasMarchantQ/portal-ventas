import express from 'express';
const router = express.Router();
import upload from '../config/multerConfig.js';
import { exportSales } from '../controllers/exportController.js';
import { getAllSales , getSaleHistory , createSale, getSales, getSaleById, getSalesBySearch, updateSale, updateSalePriority, getPromotionsByCommune, getInstallationAmountsByPromotion } from '../controllers/salesController.js';
import { authenticate, isAnyRole } from '../middlewares/authMiddleware.js';

//get
router.get('/all', authenticate, isAnyRole(['SuperAdmin', 'Administrador', 'Validador', 'Ejecutivo','Despachador']), getSales);


//History
router.get('/history/:sale_id', getSaleHistory);

// get promotions by commune
router.get('/promotions/commune/:commune_id', getPromotionsByCommune);
// get installation amounts by promotion
router.get('/installation-amounts/promotion/:promotion_id', getInstallationAmountsByPromotion);
// get por buscador de text
router.get('/all/search', authenticate, isAnyRole(['SuperAdmin', 'Administrador', 'Validador', 'Ejecutivo','Despachador']), getSalesBySearch);
// get por id
router.get('/:sale_id', authenticate, isAnyRole(['SuperAdmin', 'Administrador', 'Validador', 'Ejecutivo','Despachador']), getSaleById);

//patch
router.put('/update/:sale_id', authenticate, isAnyRole(['SuperAdmin', 'Administrador', 'Ejecutivo', 'Validador', 'Despachador']), upload, updateSale);
router.put('/update-priority/:sale_id', authenticate, updateSalePriority);



//post
router.post('/create', authenticate, isAnyRole(['Ejecutivo','SuperAdmin','Administrador']), upload, createSale);


router.get('/all/export/:format', authenticate, isAnyRole(['SuperAdmin', 'Administrador', 'Validador', 'Ejecutivo','Despachador']), async (req, res) => {
  const sales = await getAllSales(req);
  const salesExport = sales.map(sale => {
    return {
      sale_id: sale.sale_id,
      service_id: sale.service_id,
      client_first_name: sale.client_first_name,
      client_last_name: sale.client_last_name,
      client_rut: sale.client_rut,
      client_email: sale.client_email,
      client_phone: sale.client_phone,
      client_secondary_phone: sale.client_secondary_phone,
      region: sale.region.region_name,
      commune: sale.commune.commune_name,
      street: sale.street,
      number: sale.number,
      department_office_floor: sale.department_office_floor,
      geo_reference: sale.geo_reference,
      promotion: sale.promotion.promotion,
      installationAmount: sale.installationAmount ? sale.installationAmount.amount : '',
      additional_comments: sale.additional_comments,
      is_priority: sale.is_priority,
      saleStatus: sale.saleStatus.status_name,
      reason: sale.reason ? sale.reason.reason_name : '', // Dejar el campo vacío si no hay motivo
      company: sale.company.company_name,
      created_at: sale.created_at
    };
  });

  const format = req.params.format;
  const filters = req.query;
  await exportSales(salesExport, format, filters, res);
});

export default router;
