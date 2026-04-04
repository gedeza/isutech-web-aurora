import express from "express"
import { body } from "express-validator"
import * as productController from "../controllers/product.controller.prisma"
import { validateRequest } from "../middleware/validate-request"
import { protect, adminOnly } from "../middleware/auth.prisma"

const router = express.Router()

// Public routes
router.get("/", productController.getAllProducts)
router.get("/categories", productController.getProductCategories)
router.get("/slug/:slug", productController.getProductBySlug)

// Protected routes
router.use(protect)
router.get("/:id", productController.getProductById)

// Admin routes
router.use(adminOnly)

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("shortDescription").notEmpty().withMessage("Short description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("technologies").isArray().withMessage("Technologies must be an array"),
    body("images").isArray().withMessage("Images must be an array"),
    body("status").isIn(["ACTIVE", "DRAFT", "ARCHIVED", "Active", "Draft", "Archived"]).withMessage("Invalid status"),
  ],
  validateRequest,
  productController.createProduct,
)

router.get("/admin", productController.getAllProducts)

router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
    body("shortDescription").optional().notEmpty().withMessage("Short description cannot be empty"),
    body("category").optional().notEmpty().withMessage("Category cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("technologies").optional().isArray().withMessage("Technologies must be an array"),
    body("images").optional().isArray().withMessage("Images must be an array"),
    body("status").optional().isIn(["Active", "Draft", "Archived"]).withMessage("Invalid status"),
  ],
  validateRequest,
  productController.updateProduct,
)

router.patch(
  "/:id/status",
  [body("status").isIn(["Active", "Draft", "Archived"]).withMessage("Invalid status")],
  validateRequest,
  productController.updateProductStatus,
)

router.delete("/:id", productController.deleteProduct)

// Variant routes - TODO: Implement variant methods in Prisma controller
// router.post(
//   "/:id/variants",
//   [
//     body("sku").notEmpty().withMessage("SKU is required"),
//     body("price").isNumeric().withMessage("Price must be a number"),
//     body("inventory").isNumeric().withMessage("Inventory must be a number"),
//   ],
//   validateRequest,
//   productController.addProductVariant,
// )

// router.put(
//   "/:id/variants/:variantId",
//   [
//     body("sku").optional().notEmpty().withMessage("SKU cannot be empty"),
//     body("price").optional().isNumeric().withMessage("Price must be a number"),
//     body("inventory").optional().isNumeric().withMessage("Inventory must be a number"),
//   ],
//   validateRequest,
//   productController.updateProductVariant,
// )

// router.delete("/:id/variants/:variantId", productController.deleteProductVariant)

export default router