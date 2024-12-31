const express = require("express")
const authMiddleware = require("../../middleware/auth-middleware")
const adminMiddleware = require("../../middleware/admin-middleware")

const { getAllUsers, makeAdmin, deleteUser, getAllContacts, deleteContact, getAllNewsLetter, deleteNewsLetter, getAllProductQuery, deleteProductQuery } = require("../../controllers/Admin-Controllers/Admin-controllers")

const { addHomeCarousel, getSingalHomeCarousel, updateHomeCarousel, deleteHomeCarousel } = require("../../controllers/Admin-Controllers/AdminCarousel-controllers")

const { addApplication, getSingleApplication, updateApplication, deleteApplication } = require("../../controllers/Admin-Controllers/AdminApplication-controllers")
const { addSingleProduct, getSingleProduct, updateSingalProduct, deleteSingalProduct } = require("../../controllers/Admin-Controllers/AdminProduct-controller")

const { addPatner, getSingalPatner, updateSingalPatner, deleteSingalPatner } = require("../../controllers/Admin-Controllers/AdminPatner-controllers")

const { addThemeCategory, getSingalThemeCategory, updateSingalThemeCategory, deleteSingalThemeCategory } = require("../../controllers/Admin-Controllers/AdminThemeCategory-controllers")

const router = express.Router()

router.route("/getallusers").get(authMiddleware, adminMiddleware, getAllUsers)

router.route("/makeadmin/:id").put(authMiddleware, adminMiddleware, makeAdmin)

router.route("/deleteuser/:id").delete(authMiddleware, adminMiddleware, deleteUser)

router.route("/getallcontacts").get(authMiddleware, adminMiddleware, getAllContacts)

router.route("/deletecontact/:id").delete(authMiddleware, adminMiddleware, deleteContact)

router.route("/getallnewsletters").get(authMiddleware, adminMiddleware, getAllNewsLetter)

router.route("/deletenewsletter/:id").delete(authMiddleware, adminMiddleware, deleteNewsLetter)

router.route("/getallproductqueries").get(authMiddleware, adminMiddleware, getAllProductQuery)

router.route("/deleteproductquery/:id").delete(authMiddleware, adminMiddleware, deleteProductQuery)

router.route("/addhomecarousel").post(authMiddleware, adminMiddleware, addHomeCarousel)
router.route("/getsingalhomecarousel/:id").get(authMiddleware, adminMiddleware, getSingalHomeCarousel)
router.route("/updatehomecarousel/:id").put(authMiddleware, adminMiddleware, updateHomeCarousel)
router.route("/deletehomecarousel/:id").delete(authMiddleware, adminMiddleware, deleteHomeCarousel)

router.route("/addapplication").post(authMiddleware, adminMiddleware, addApplication)
router.route("/getsingalapplication/:id").get(authMiddleware, adminMiddleware, getSingleApplication)
router.route("/updateapplication/:id").put(authMiddleware, adminMiddleware, updateApplication)
router.route("/deleteapplication/:id").delete(authMiddleware, adminMiddleware, deleteApplication)

router.route("/addsingalProduct").post(authMiddleware, adminMiddleware, addSingleProduct)
router.route("/getsingalProduct/:id").get(authMiddleware, adminMiddleware, getSingleProduct)
router.route("/updatesingalProduct/:id").put(authMiddleware, adminMiddleware, updateSingalProduct)
router.route("/deletesingalProduct/:id").delete(authMiddleware, adminMiddleware, deleteSingalProduct)

router.route("/addpatner").post(authMiddleware, adminMiddleware, addPatner)
router.route("/getsingalPatner/:id").get(authMiddleware, adminMiddleware, getSingalPatner)
router.route("/updatesingalPatner/:id").put(authMiddleware, adminMiddleware, updateSingalPatner)
router.route("/deletesingalPatner/:id").delete(authMiddleware, adminMiddleware, deleteSingalPatner)

router.route("/addthemecategory").post(authMiddleware, adminMiddleware, addThemeCategory)
router.route("/getsingalThemeCategory/:id").get(authMiddleware, adminMiddleware, getSingalThemeCategory)
router.route("/updatesingalThemeCategory/:id").put(authMiddleware, adminMiddleware, updateSingalThemeCategory)
router.route("/deletesingalThemeCategory/:id").delete(authMiddleware, adminMiddleware, deleteSingalThemeCategory)


module.exports = router