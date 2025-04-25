
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  username: 'username',
  phone: 'phone'
};

exports.Prisma.ShipmentScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  shipper: 'shipper',
  shipperId: 'shipperId',
  trackingNumber: 'trackingNumber',
  shipmentStatus: 'shipmentStatus',
  deliveryDate: 'deliveryDate',
  lat: 'lat',
  long: 'long',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  createdAt: 'createdAt',
  deliveryAddress: 'deliveryAddress',
  deliveryStatus: 'deliveryStatus',
  orderDate: 'orderDate',
  paymentMethod: 'paymentMethod',
  paymentStatus: 'paymentStatus',
  productId: 'productId',
  productName: 'productName',
  quantity: 'quantity',
  totalPrice: 'totalPrice',
  trackingNumber: 'trackingNumber',
  updatedAt: 'updatedAt',
  userId: 'userId',
  shipmentStatus: 'shipmentStatus',
  shipmentId: 'shipmentId'
};

exports.Prisma.BlacklistedTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlogScalarFieldEnum = {
  id: 'id',
  image: 'image',
  title: 'title',
  description: 'description',
  date: 'date'
};

exports.Prisma.InventoryScalarFieldEnum = {
  id: 'id',
  productName: 'productName',
  productType: 'productType',
  productStatus: 'productStatus',
  supplierId: 'supplierId',
  quantity: 'quantity',
  price: 'price',
  sellingPrice: 'sellingPrice',
  dateAdded: 'dateAdded',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  taskType: 'taskType',
  assignee: 'assignee',
  priorityLevel: 'priorityLevel',
  description: 'description',
  dueDate: 'dueDate',
  location: 'location',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.userOrderByRelevanceFieldEnum = {
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  username: 'username',
  phone: 'phone'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.ShipmentOrderByRelevanceFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  shipper: 'shipper',
  shipperId: 'shipperId',
  trackingNumber: 'trackingNumber'
};

exports.Prisma.OrderOrderByRelevanceFieldEnum = {
  id: 'id',
  deliveryAddress: 'deliveryAddress',
  deliveryStatus: 'deliveryStatus',
  productId: 'productId',
  productName: 'productName',
  trackingNumber: 'trackingNumber',
  shipmentId: 'shipmentId'
};

exports.Prisma.BlacklistedTokenOrderByRelevanceFieldEnum = {
  id: 'id',
  token: 'token'
};

exports.Prisma.blogOrderByRelevanceFieldEnum = {
  image: 'image',
  title: 'title',
  description: 'description'
};

exports.Prisma.InventoryOrderByRelevanceFieldEnum = {
  id: 'id',
  productName: 'productName',
  productType: 'productType',
  supplierId: 'supplierId'
};

exports.Prisma.TaskOrderByRelevanceFieldEnum = {
  id: 'id',
  taskType: 'taskType',
  assignee: 'assignee',
  priorityLevel: 'priorityLevel',
  description: 'description',
  location: 'location',
  status: 'status'
};
exports.shipmentStatus = exports.$Enums.shipmentStatus = {
  Pending: 'Pending',
  Completed: 'Completed',
  InTransit: 'InTransit',
  Failed: 'Failed'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  Active: 'Active',
  Inactive: 'Inactive'
};

exports.paymentMethod = exports.$Enums.paymentMethod = {
  CreditCard: 'CreditCard',
  DebitCard: 'DebitCard',
  PayPal: 'PayPal',
  BankTransfer: 'BankTransfer'
};

exports.paymentStatus = exports.$Enums.paymentStatus = {
  Pending: 'Pending',
  Completed: 'Completed',
  Failed: 'Failed'
};

exports.productStatus = exports.$Enums.productStatus = {
  Available: 'Available',
  OutOfStock: 'OutOfStock'
};

exports.Prisma.ModelName = {
  user: 'user',
  Shipment: 'Shipment',
  Order: 'Order',
  BlacklistedToken: 'BlacklistedToken',
  blog: 'blog',
  Inventory: 'Inventory',
  Task: 'Task'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
