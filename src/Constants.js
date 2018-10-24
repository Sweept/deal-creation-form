const Constants = {
	steps: ["stepOne", "stepTwo"],
	stepOne: {
		title: "Create a deal",
		buttons: [
			{
				title: "Next",
			}
		],
		inputFields: [
			{
				title: "Name",
				id: "dealName",
				type: "text",
				mandatory: true,
				regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?,\d+]/,
				condition: "only contains charactors a-z"
			},
			{
				title: "Date",
				id: "dealDate",
				type: "date",
				mandatory: true,
				condition: "must be a past date",
				date:{
					max: new Date().toISOString().split('T')[0]
				}
			},
			{
				title: "Amount",
				id: "dealAmount",
				type: "number",
				mandatory: true,
				condition: "must be a number"
			},
		]
	},
	stepTwo: {
		title: "Create an invoice",
		buttons: [
			{
				title: "Previous",
			},
			{
				title: "Submit",
			}
		],
		inputFields: [
			{
				title: "Invoice Name",
				id: "invoiceName",
				type: "text",
				mandatory: true,
				regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?,\d+]/,
				condition: "only contains charactors a-z"
			},
			{
				title: "Issue Date",
				id: "invoiceIssueDate",
				type: "date",
				mandatory: true,
				condition: "must be a past date",
				date:{
					max: new Date().toISOString().split('T')[0]
				}
			},
			{
				title: "Repayment Date",
				id: "invoiceRepaymentDate",
				type: "date",
				mandatory: true,
				condition: "cannot be before or on Issued Date",
				date:{
					min: new Date().toISOString().split('T')[0]
				}
			},
			{
				title: "Amount",
				id: "invoiceAmount",
				type: "number",
				mandatory: true,
				condition: "must be a number && Should be more than Deal Amount"
			},
		]
	}
}

export default Constants;