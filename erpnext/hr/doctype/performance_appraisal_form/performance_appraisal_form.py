# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from datetime import datetime
import time
from datetime import date
from frappe.utils import getdate
from frappe.utils import cint


class PerformanceAppraisalForm(Document):
	# pass
	def get_date(self):
		d1 = datetime.strptime(self.date_of_joining, "%Y-%m-%d")
		d2 = datetime.strptime(self.date, "%Y-%m-%d")
		diff = abs(((d2 - d1).days)/30)
		self.time_with_indictrans = diff
		# frappe.errprint(self.time_with_indictrans)

		desig = frappe.db.sql("select modified,designation from `tabEmployee` where name='%s'"%(self.employee_id))
		# frappe.errprint(desig[0][0])
		d = desig[0][0]
		date1 = d.strftime('%Y-%m-%d')
		frappe.errprint(self.date)
		
		# date2 = datetime.strptime(self.date,"%Y-%m-%d %H-%M-%S").date()
		date2 = getdate(self.date)
		# date3 = datetime.strptime(date1, "%Y-%m-%d")
		diff1 = abs(((date2 - getdate(date1)).days)/30)
		self.time_in_current_position = diff1
		return {
			'diff': diff,
			'diff1': diff1
		}
		# frappe.errprint(diff1)

	def get_total(self):
		total_rate=cint(self.r1)+cint(self.r2)+cint(self.r3)+cint(self.r4)+cint(self.r5)+cint(self.r6)+cint(self.r7)+cint(self.r8)+cint(self.r9)+cint(self.r10)+cint(self.r11)+cint(self.r12)
		self.total_rating = total_rate
		frappe.errprint(self.total_rating)
		# if (self.total_rating==)
		return {
			'total_rate':total_rate
		}