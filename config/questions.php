<?php

return [
	'1' =>[
		"id" => 1,
		"question" => "Which insurance product are you interested in?",
		"ans_text" => "",
		"value" => [],
		"sub_question" =>[ 
		    1 =>[
				"question" => "Are you interested in securing your family’s financial stability and lifestyle once you pass away?",
				"ans_text" => "",
				"value" => [],	
			],
			[
				"question" => "Are you interested in securing your financial stability against critical illnesses in the event of hospitalization?",
				"ans_text" => "",
				"value" => [],	
			],
			[
				"question" => "Are you interested in receiving an income for as long as you are disabled should you lose the ability to satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance)?",
				"ans_text" => "",
				"value" => [],
			],
		]

	],
	'2' =>[
		"id" => 2,
		"question" => "What is your date of birth?",
		"ans_text" => "",
		"value" => "",
	],
	'3' =>[
		"id" => 3,
		"question" => "What is your gender?",
		"ans_text" => "",
		"value" => "",
	],
	'4' =>[
		"id" => 4,
		"question" => "Are you a smoker?",
		"ans_text" => "",
		"value" => "",
	],
	'5' =>[
		"id" => 5,
		"question" => "How many children do you have?",
		"ans_text" => "",
		"value" => "",
	],
	'6' =>[
		"id" => 6,
		"question" => "What is your annual income?",
		"ans_text" => "",
		"value" => "",
		
	],
	'7' =>[
		"id" => 7,
		"question" => "What is the cost of your monthly mortgage payments?",
		"ans_text" => "",
		"value" => "",
	],
	'8' =>[
		"id" => 8,
		"question" => "Approximately what is your total monthly expense?",
		"ans_text" => "",
		"value" => "",
	],
	'9' =>[
		"id" => 9,
		"question" => "Do you have any existing individual or group insurance policies?",
		"ans_text" => "",
		"value" => "",
		"coverage_amount" => "",
        "insurance_plan" => '',
        "insurance_document" =>'',
	],
];


// '1' =>[
// 		"id" => 1,
// 		"text" => "Which insurance product are you interested in?",
// 		"type" => "multi-select",
// 		"options"=>[
// 			1 => [
// 				"text" => "Life Insurance",
// 				"tool-tip" => "When you die this allows you to care for your loved ones and family members after your death.",
// 				"value"=>1,
// 			],
// 			2 => [
// 				"text" => "Critical Illness Insurance",
// 				"tool-tip" => "When you become extremely sick but you don’t die. The big three examples are heart attacks, strokes, and cancer. This allows you to pay for your medical bills.",
// 				"value"=>2,
// 			],
// 			3 => [
// 				"text" => "Long Term Care Insurance",
// 				"tool-tip" => "When  you do not satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance) you are deemed disabled regardless of your age.",
// 				"value" => 3,
// 			],
// 			4 => [
// 				"text" => "I don't know",
// 				"tool-tip" => "",
// 				"value"=>null,
// 				"sub-question" =>[ 
// 					[
// 						"text" => "Are you interested in securing your family’s financial stability and lifestyle once you pass away?",
// 						"type" => "select",
// 						"options"=> [
// 							[
// 								"text" => "Yes",
// 								"tool-tip" => "",
// 								"value"=>0,
// 							],
// 							[
// 								"text" => "No",
// 								"tool-tip" => "",
// 								"value"=>null,
// 							],
// 						]

// 					],
// 					[
// 						"text" => "Are you interested in securing your financial stability against critical illnesses in the event of hospitalization?",
// 						"type" => "select",
// 						"options"=> [
// 							[
// 								"text" => "Yes",
// 								"tool-tip" => "",
// 								"value"=>1,
// 							],
// 							[
// 								"text" => "No",
// 								"tool-tip" => "",
// 								"value"=>null,
// 							],
// 						]

// 					],
// 					[
// 						"text" => "Are you interested in receiving an income for as long as you are disabled should you lose the ability to satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance)?",
// 						"type" => "select",
// 						"options"=> [
// 							[
// 								"text" => "Yes",
// 								"tool-tip" => "",
// 								"value"=>2,
// 							],
// 							[
// 								"text" => "No",
// 								"tool-tip" => "",
// 								"value"=>null,
// 							],
// 						]

// 					],
// 				]
// 			],
// 		],
// 	],
// 	'2' =>[
// 		"id" => 2,
// 		"text" => "What is your date of birth?",
// 		"type" => "date",
// 		"options"=>[],
// 	],
// 	'3' =>[
// 		"id" => 3,
// 		"text" => "What is your gender?",
// 		"type" => "dropdown",
// 		"options"=>[
// 			[
// 				"text" => "Male",
// 				"tool-tip" => "",
// 				"value"=>0,
// 			],
// 			[
// 				"text" => "Female",
// 				"tool-tip" => "",
// 				"value"=>1,
// 			],
// 		],
// 	],
// 	'4' =>[
// 		"id" => 4,
// 		"text" => "Are you a smoker?",
// 		"type" => "select",
// 		"options"=>[
// 			[
// 				"text" => "Yes",
// 				"tool-tip" => "",
// 				"value"=>1,
// 			],
// 			[
// 				"text" => "No",
// 				"tool-tip" => "",
// 				"value"=>0,
// 			],
// 		],
// 	],
// 	'5' =>[
// 		"id" => 5,
// 		"text" => "How many children do you have?",
// 		"type" => "Numrical",
// 		"options"=>[
// 			[
// 				"text" => "No",
// 				"tool-tip" => "",
// 				"value"=>0,
// 			],
// 			[
// 				"text" => "Yes",
// 				"tool-tip" => "",
// 				"value"=>1,
// 			],
// 		],
// 	],
// 	'6' =>[
// 		"id" => 6,
// 		"text" => "What is your annual income?",
// 		"type" => "Numerical",
// 		"options"=>[],
		
// 	],
// 	'7' =>[
// 		"id" => 7,
// 		"text" => "What is the cost of your monthly mortgage payments?",
// 		"type" => "select",
// 		"options"=>[
// 			[
// 				"text" => "Enter numerical value",
// 				"tool-tip" => "",
// 				"value"=>"",
// 			],
// 			[
// 				"text" => "No mortgage",
// 				"tool-tip" => "",
// 				"value"=>0,
// 			],
// 			[
// 				"text" => "Skip",
// 				"tool-tip" => "",
// 				"value"=>null,
// 			],
// 		],
// 	],
// 	'8' =>[
// 		"id" => 8,
// 		"text" => "Approximately what is your total monthly expense?",
// 		"type" => "Numerical",
// 		"options"=>[],
// 	],
// 	'9' =>[
// 		"id" => 9,
// 		"text" => "Do you have any existing individual or group insurance policies?",
// 		"type" => "select",
// 		"options"=>[
// 			[
// 				"text" => "No",
// 				"tool-tip" => "",
// 				"value"=>0,
// 			],
// 			[
// 				"text" => "Yes",
// 				"tool-tip" => "",
// 				"value"=>1,
// 			],
// 			[
// 				"text" => "Not sure",
// 				"tool-tip" => "",
// 				"value"=>2,
// 			],
// 		],
// 	],