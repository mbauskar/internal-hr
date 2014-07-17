cur_frm.add_fetch('employee_id', 'date_of_joining', 'date_of_joining');
cur_frm.add_fetch('employee_id', 'employee_name', 'employee_name');
cur_frm.add_fetch('employee_id', 'designation', 'current_designation');

cur_frm.cscript.onload = function(doc, dt, dn) {
 from_date_and_to_date_of_appraisal_period(doc,dt,dn)
}
 from_date_and_to_date_of_appraisal_period = function(doc, dt, dn) {
  var fiscal_year=doc.fiscal_year
  var res = fiscal_year.split("-");
  set_multiple(dt,dn,{appraisal_period_from:res[0]+"-06-01",appraisal_period_to:res[1]+"-05-31"})
}

cur_frm.cscript.employee_id = function(doc, cdt, cdn) {
	
	get_server_fields('get_date','','',doc, cdt, cdn, 1,function(r){
		refresh_field('time_with_indictrans');
		refresh_field('time_in_current_position');
	});
}

cur_frm.cscript.total = function(doc, cdt, cdn) {
	get_server_fields('get_total','','',doc, cdt, cdn, 1, function(r){
		// console.log(r.total_rating)
		refresh_field('total_rating');
		if (r.total_rating > 30 ){
			cur_frm.set_value('comment_on_rating', "Consistently exceeds all requirements; superior performance.")
			refresh_field('comment_on_rating');
		}
		else if(r.total_rating > 24 && r.total_rating <=30){
			cur_frm.set_value('comment_on_rating', "Generally exceeds requirements with a minimum of guidance; well above average performance.")
			refresh_field('comment_on_rating');
		}
		else if(r.total_rating > 14 && r.total_rating <=24){
			cur_frm.set_value('comment_on_rating', "Responsibilities met in a wholly satisfactory manner; normal guidance and supervision required.")
			refresh_field('comment_on_rating');
		}
		else if(r.total_rating > 9 && r.total_rating <=14){
			cur_frm.set_value('comment_on_rating', "Improvement needed in some key job areas; considerable guidance and supervision are required.")
			refresh_field('comment_on_rating');
		}
		else if(r.total_rating <=9){
			cur_frm.set_value('comment_on_rating', "Major shortcomings in performance; Performance improvement plan required to improve performance within a set time frame.")
			refresh_field('comment_on_rating');
		}
	});
	refresh_field('comment_on_rating');
}
