export type IndustryPanel = {
  label: string;
  headline: string;
  body: string;
  features: readonly [string, string, string, string];
};

export const INDUSTRY_PANELS: readonly IndustryPanel[] = [
  {
    label: "Retail",
    headline: "Branding & Identity",
    body: "Match the fast pace of shoppers with quick checkout processing via advanced POS for retail. Manage store logistics, inventory, and stocking without worrying about human error and inaccuracy. Enjoy shorter queues with better reviews today!",
    features: ["Low-stock alerts", "Unified In-Store Sales", "Accurate Online Sales", "Vendor Sales Reporting"],
  },
  {
    label: "Restaurants",
    headline: "Dine-In & Delivery",
    body: "Run the floor and the kitchen from one system: fast table turns, split checks, and delivery handoffs without chaos. Prismatech financing helps you deploy tablets, kiosks, and kitchen displays with predictable monthly or transaction-based terms.",
    features: ["Table & bar tabs", "Kitchen display routing", "Tips & service charges", "Menu & modifier sync"],
  },
  {
    label: "Supermarkets",
    headline: "High-Volume Checkout",
    body: "Keep lanes moving during rush hour with scanners, scales, and promotions that stay in sync across every register. Finance lane upgrades and self-checkout so you can modernize without tying up working capital.",
    features: ["Weighted produce", "Multi-lane reporting", "Loyalty & coupons", "Central price updates"],
  },
  {
    label: "Salons & Spas",
    headline: "Bookings & Retail",
    body: "Blend appointments, memberships, and retail in one flow so front desk stays calm and retail shelves stay stocked. POS hardware and software upgrades scale with your locations—financed on terms that fit seasonal revenue.",
    features: ["Staff scheduling hooks", "Membership billing", "Retail add-ons", "Client history at checkout"],
  },
  {
    label: "Service Industries",
    headline: "Field & Front Desk",
    body: "Whether you invoice on-site or at the counter, take deposits, signatures, and card-present payments with dependable terminals. We help service businesses roll out rugged devices and cloud POS with clear payoff paths.",
    features: ["Estimates to invoice", "Deposit capture", "Multi-location sync", "Transparent reporting"],
  },
  {
    label: "Cannabis Dispensaries",
    headline: "Compliant Retail",
    body: "Stay aligned with traceability, purchase limits, and inventory rules while keeping lines short and audits painless. Finance compliant registers and scanners so your shop can expand lanes without a heavy upfront hit.",
    features: ["ID & limit checks", "Inventory tracking", "Multi-register sync", "Audit-ready exports"],
  },
] as const;
