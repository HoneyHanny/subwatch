'use client'

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "@/lib/types/data-table-features.type"
import { SubscriptionModel } from "@/lib/types/subscription.type"

const columnHelper = createColumnHelper<DataTableFeatures, SubscriptionModel>()

export const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Name'
  }),
  columnHelper.accessor('cost', {
    header: 'Cost'
  }),
  columnHelper.accessor('billingCycle', {
    header: 'Billing Cycle'
  }),
  columnHelper.accessor('nextBillingDate', {
    header: 'Next Billing Date'
  }),
  columnHelper.accessor('category', {
    header: 'Category'
  }),
  columnHelper.accessor('status', {
    header: 'Status'
  }),
])