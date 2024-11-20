var ver_major = 0
var ver_minor = 3
var ver_revision = 0
var p1Sel, p2Sel, iBan, iReq, pBan, pReq, boss, maxM, maxS, maxP, maxE, maxR;
var pids = ['#p1c1', '#p2c1', '#p2c2', '#p1c2'];
var lib = {'charge': 'Charge Beam',
		   'ice': 'Ice Beam',
		   'wave': 'Wave Beam', 
		   'spazer': 'Spazer Beam',
		   'plasma': 'Plasma Beam',
		   'varia': 'Varia Suit',
		   'gravity': 'Gravity Suit',
		   'screw': 'Screw Attack',
		   'hijump': 'Hi-Jump Boots',
		   'speed': 'Speed Booster',
		   'sj': 'Space Jump',
		   'springball': 'Springball',
		   'grapple': 'Grapple Beam',
		   'xray': 'X-Ray Scope',
		   'missiles': 'Missiles',
		   'supers': 'Super Missiles',
		   'pbs': 'Power Bombs',
		   'ets': 'Energy Tanks',
		   'reserve': 'Reserve Tanks',
		   'kraid': 'Kraid Last',
		   'phantoon': 'Phantoon Last',
		   'draygon': 'Draygon Last',
		   'ridley': 'Ridley Last',
		   'sporespawn': 'Spore Spawn First',
		   'crocomire': 'Crocomire First',
		   'botwoon': 'Botwoon First'};

function initTool() {
	$('select').prop('disabled', true).empty();
	$('button:contains("Apply")').prop('disabled', true);
	$('#goal').html("");
	
	p1Sel = p2Sel = ['Ban', 'Require'];
	iBan = iReq = [lib['charge'],
				   lib['ice'],
				   lib['wave'],
				   lib['spazer'],
				   lib['plasma'],
				   lib['varia'],
				   lib['gravity'],
				   lib['screw'],
				   lib['hijump'],
				   lib['speed'],
				   lib['sj'],
				   lib['springball'],
				   lib['grapple'],
				   lib['xray']];
	pBan = pReq = [lib['missiles'],
				   lib['supers'],
				   lib['pbs'],
				   lib['ets'],
				   lib['reserve']];
	boss = [lib['kraid'],
			lib['phantoon'],
			lib['draygon'],
			lib['ridley']];
	mboss = [lib['sporespawn'],
			 lib['crocomire'],
			 lib['botwoon']];

	maxM = 230;
	maxS = 50;
	maxP = 50;
	maxE = 14;
	maxR = 4;

	applyChoice(0);
}

function applyBan(sel) {
	iBan = remove(iBan, sel);
	iReq = remove(iReq, sel);
	pBan = remove(pBan, sel);
	pReq = remove(pReq, sel);
	switch(sel) {
		case lib['charge']:
			pBan = remove(pBan, lib['missiles']);
			break;
		case lib['ice']:
			iBan = remove(iBan, lib['gravity']);
			boss = remove(boss, lib['phantoon']);
			mboss = remove(mboss, lib['botwoon']);
			iBan = remove(iBan, lib['speed']);
			if (isBanned(lib['grapple'])) {
				iReq = remove(iReq, lib['springball'])
			}
			break;
		case lib['wave']:
			maxE -= 1;
			break;
		case lib['varia']:
			if (isBanned(lib['gravity']) || isRequired(lib['phantoon']))  {
				pBan = remove(pBan, lib['missiles']);
				pBan = remove(pBan, lib['supers']);
				pBan = remove(pBan, lib['pbs']);
				pBan = remove(pBan, lib['ets']);
				pBan = remove(pBan, lib['reserve']);
			}
			break;
		case lib['gravity']:
			iBan = remove(iBan, lib['ice']);
			iBan = remove(iBan, lib['hijump']);
			iBan = remove(iBan, lib['grapple']);
			iBan = remove(iBan, lib['xray']);
			iReq = remove(iReq, lib['springball']);
			maxP -= 5;
			maxR -= 1;
			if (!isBanned(lib['speed'])) {
				maxM -= 10;
				maxS -= 5;
				if (isPRequired(lib['reserve'], 3)) {
					iBan = remove(iBan, lib['speed']);
				}
			}
			if (isBanned(lib['varia']) || isRequired(lib['kraid']))  {
				pBan = remove(pBan, lib['missiles']);
				pBan = remove(pBan, lib['supers']);
				pBan = remove(pBan, lib['pbs']);
				pBan = remove(pBan, lib['ets']);
				pBan = remove(pBan, lib['reserve']);
			}
			break;
		case lib['hijump']:
			iBan = remove(iBan, lib['gravity']);
			boss = remove(boss, lib['phantoon']);
			mboss = remove(mboss, lib['botwoon']);
			break;
		case lib['speed']:
			iBan = remove(iBan, lib['ice']);
			maxR -= 1;
			maxE -= 1;
			maxS -= 5;
			if (!isBanned(lib['gravity'])) {
				maxM -= 10;
				maxS -= 5;
				if (isPRequired(lib['reserve'], 3)) {
					iBan = remove(iBan, lib['gravity']);
				}
			}
			break;
		case lib['sj']:
			maxM -= 5;
			break;
		case lib['grapple']:
			mboss = remove(mboss, lib['botwoon']);
			if (isBanned(lib['ice'])) {
				iReq = remove(iReq, lib['springball'])
			}
			break;
		case lib['xray']:
			iBan = remove(iBan, lib['gravity']);
			boss = remove(boss, lib['phantoon']);
			break;
		case lib['missiles']:
			iBan = remove(iBan, lib['charge'])
			pBan = remove(pBan, lib['supers'])
			if (isBanned(lib['varia']) || isRequired(lib['kraid'])) {
				iBan = remove(iBan, lib['gravity']);
				boss = remove(boss, lib['phantoon'])
			}
			if (isBanned(lib['gravity'], iBan) || isRequired(lib['phantoon'])) {
				iBan = remove(iBan, lib['varia']);
				boss = remove(boss, lib['kraid']);
			}
			break;
		case lib['supers']:
			pBan = remove(pBan, lib['missiles'])
			if (isBanned(lib['varia']) || isRequired(lib['kraid'])) {
				iBan = remove(iBan, lib['gravity']);
				boss = remove(boss, lib['phantoon'])
			}
			if (isBanned(lib['gravity'], iBan) || isRequired(lib['phantoon'])) {
				iBan = remove(iBan, lib['varia']);
				boss = remove(boss, lib['kraid']);
			}
			break;
		case lib['pbs']:
			if (isBanned(lib['varia']) || isRequired(lib['kraid'])) {
				iBan = remove(iBan, lib['gravity']);
				boss = remove(boss, lib['phantoon'])
			}
			if (isBanned(lib['gravity'], iBan) || isRequired(lib['phantoon'])) {
				iBan = remove(iBan, lib['varia']);
				boss = remove(boss, lib['kraid']);
			}
			break;
		case lib['ets']:
			if (isBanned(lib['varia']) || isRequired(lib['kraid'])) {
				iBan = remove(iBan, lib['gravity']);
				boss = remove(boss, lib['phantoon'])
			}
			if (isBanned(lib['gravity'], iBan) || isRequired(lib['phantoon'])) {
				iBan = remove(iBan, lib['varia']);
				boss = remove(boss, lib['kraid']);
			}
			break;
		case lib['reserve']:
			if (isBanned(lib['varia']) || isRequired(lib['kraid'])) {
				iBan = remove(iBan, lib['gravity']);
				boss = remove(boss, lib['phantoon'])
			}
			if (isBanned(lib['gravity'], iBan) || isRequired(lib['phantoon'])) {
				iBan = remove(iBan, lib['varia']);
				boss = remove(boss, lib['kraid']);
			}
			break;
	}
}

function applyReq(sel) {
	iBan = remove(iBan, sel);
	iReq = remove(iReq, sel);
	pBan = remove(pBan, sel);
	pReq = remove(pReq, sel);
	boss = remove(boss, sel);
	mboss = remove(mboss, sel);
	switch(sel) {
		case lib['springball']:
			iBan = remove(iBan, lib['gravity']);
			if (isBanned(lib['ice'])) {
				iBan = remove(iBan, lib['grapple'])
				if (ifBanned(lib['hijump'])) {
					iBan = remove(iBan, lib['sj'])
				}
				else if (isBanned(lib['sj'])) {
					iBan = remove(iBan, lib['hijump'])
				}
			}
			else if (isBanned(lib['grapple'])) {
				iBan = remove(iBan, lib['ice'])
			}
			
			break;
		case lib['kraid']:
			if (isBanned(lib['gravity']))  {
				pBan = remove(pBan, lib['missiles']);
				pBan = remove(pBan, lib['supers']);
				pBan = remove(pBan, lib['pbs']);
				pBan = remove(pBan, lib['ets']);
				pBan = remove(pBan, lib['reserve']);
			}
			if (isBanned(lib['missiles']) || isBanned(lib['supers']) || isBanned(lib['pbs']) ||
				isBanned(lib['ets']) || isBanned(lib['reserve'])) {
				iBan = remove(iBan, lib['gravity']);
			}
			break;
		case lib['phantoon']:
			iBan = remove(iBan, lib['ice']);
			iBan = remove(iBan, lib['hijump']);
			iBan = remove(iBan, lib['grapple']);
			iBan = remove(iBan, lib['xray']);
			if (isBanned(lib['varia']))  {
				pBan = remove(pBan, lib['missiles']);
				pBan = remove(pBan, lib['supers']);
				pBan = remove(pBan, lib['pbs']);
				pBan = remove(pBan, lib['ets']);
				pBan = remove(pBan, lib['reserve']);
			}
			if (isBanned(lib['missiles']) || isBanned(lib['supers']) || isBanned(lib['pbs']) ||
				isBanned(lib['ets']) || isBanned(lib['reserve'])) {
				iBan = remove(iBan, lib['varia']);
			}
			break;
		case lib['botwoon']:
			iBan = remove(iBan, lib['grapple']);
			iBan = remove(iBan, lib['ice']);
			iBan = remove(iBan, lib['hi-jump']);
			break;
	}
}

function applyPReq(sel, num) {	 
	pBan = remove(pBan, sel);
	pReq = remove(pReq, sel);
	switch(sel) {
		case lib['missiles']:
			if (num >= 220) {
				iBan = remove(iBan, lib['gravity']);
				iBan = remove(iBan, lib['speed']);
				iBan = remove(iBan, lib['sj']);
			}
			break;
		case lib['supers']:
			if (num >= 45) {
				iBan = remove(iBan, lib['speed']);
			}
			if (num == 50) {
				iBan = remove(iBan, lib['gravity']);
			}
			break;
		case lib['pbs']:
			if (num == 50) {
				iBan = remove(iBan, lib['gravity']);
			}
			break;
		case lib['ets']:
			if (num >= 13) {
				iBan = remove(iBan, lib['speed']);
				iBan = remove(iBan, lib['wave']);
			}
			break;
		case lib['reserve']:
			if (num == 4) {
				iBan = remove(iBan, lib['speed']);
				iBan = remove(iBan, lib['gravity']);
			}
			if (num == 3 && (isBanned(lib['gravity']) || isBanned(lib['speed']))) {
				if (isBanned(lib['gravity'])) {
					iBan = remove(iBan, lib['speed']);
				}
				else if (isBanned(lib['speed'])) {
					iBan = remove(iBan, lib['gravity']);
				}
			}
			break;
	}
}

function isBanned(value) {
	for (var i = 0; i < pids.length; i++) {
		if ($(pids[i] + "_choice option:selected").text() == "Ban") 
			if ($(pids[i] + "_sel option:selected").text() == value) 
				return true;
	}
	return false;
}

function isRequired(value) {
	for (var i = 0; i < pids.length; i++) {
		if ($(pids[i] + "_choice option:selected").text() == "Require") 
			if ($(pids[i] + "_sel option:selected").text() == value) 
				return true;
	}
	return false;
}

function isPRequired(value, num) {
	for (var i = 0; i < pids.length; i++) {
		if ($(pids[i] + "_choice option:selected").text() == "Require") 
			if ($(pids[i] + "_sel option:selected").text() == value)
				if ($(pids[i] + "_num option:selected").text() >= num)
					return true;
	}
	return false;
}

function remove(array, item) {
	array = jQuery.grep(array, function(value) {
		return value != item;
	});
	return array;
}

function applyChoice(num) {
	switch(num) {
		case 0:
			$("#p1c1_choice").prop('disabled', false);
			$("#p1c1_type").prop('disabled', false);
			$("#p1c1_sel").prop('disabled', false);
			$("#p1c1_apply").prop('disabled', false);
	
			addOptions("#p1c1_choice", p1Sel);
			updateType("#p1c1");
			break;
		case 1:
			$("[id^=p1c1_]").prop('disabled', true);
			p1Sel = remove(p1Sel, processChoice("#p1c1"));

			$("#p2c1_choice").prop('disabled', false);
			$("#p2c1_type").prop('disabled', false);
			$("#p2c1_sel").prop('disabled', false);
			$("#p2c1_apply").prop('disabled', false);
	
			addOptions("#p2c1_choice", p2Sel);
			updateType("#p2c1");
			break;
		case 2:
			$("[id^=p2c1_]").prop('disabled', true);
			p2Sel = remove(p2Sel, processChoice("#p2c1"));

			$("#p2c2_choice").prop('disabled', false);
			$("#p2c2_type").prop('disabled', false);
			$("#p2c2_sel").prop('disabled', false);
			$("#p2c2_apply").prop('disabled', false);
	
			addOptions("#p2c2_choice", p2Sel);
			updateType("#p2c2");
			break;
		case 3:
			$("[id^=p2c2_]").prop('disabled', true);
			p2Sel = remove(p2Sel, processChoice("#p2c2"));

			$("#p1c2_choice").prop('disabled', false);
			$("#p1c2_type").prop('disabled', false);
			$("#p1c2_sel").prop('disabled', false);
			$("#p1c2_apply").prop('disabled', false);
	
			addOptions("#p1c2_choice", p1Sel);
			updateType("#p1c2");
			break;
		case 4:
			$("[id^=p1c2_]").prop('disabled', true);
			p1Sel = remove(p1Sel, processChoice("#p1c2"));
			
			
			$("#goal").html(generateGoal());
			break;
		default:
			alert("Someone broke something... I'm gonna telllllll...");
			return;
	}
}

function generateGoal() {
	var goal = ".setgoal Duel [ ";
	var require = ""
	var ban = ""
	$.each(pids, function(key, value) {
		if ($(value + "_choice option:selected").text() == 'Require') {
			if (require != "")
				require += ' and ';
			if ($(value + "_num option:selected").text() != "")
				require += $(value + "_num option:selected").text() + ' ';
			require += $(value + "_sel option:selected").text();
		}
		else {
			if (ban != "")
				ban += ' and ';
			ban += $(value + "_sel option:selected").text();
		}
	});
	goal += "Require " + require + ", ";
	goal += "Ban " + ban;
	goal += " ]";
	return goal;
}

function processChoice(id) {
	if ($(id + "_choice option:selected").text() == "Ban") {
		applyBan($(id + "_sel option:selected").text());
	}
	else if ($(id + "_choice option:selected").text() == "Require") {
		if ($(id + "_type option:selected").text() == "Power Up") {
			applyPReq($(id + "_sel option:selected").text(), parseInt($(id + "_num option:selected").text()));
		}
		else {
			applyReq($(id + "_sel option:selected").text());
		}
	}
	return $(id + "_choice option:selected").text();
}

function updateType(id) {
	if ($(id + "_choice option:selected").text() == "Ban") {
		var types = [];
		if (iBan.length > 0)
			types.push("Item")
		if (pBan.length > 0)
			types.push("Power Up")
		addOptions(id + "_type", types);
		updateSelect(id);
	}
	else if ($(id + "_choice option:selected").text() == "Require") {
		var types = [];
		if (iReq.length > 0)
			types.push("Item")
		if (pReq.length > 0)
			types.push("Power Up")
		if (boss.length == 4)
			types.push("Last Boss")
		if (!isRequired(lib['sporespawn']) && !isRequired(lib['crocomire']) && !isRequired(lib['botwoon']))
			types.push("First Mini-Boss")
		addOptions(id + "_type", types);
		updateSelect(id);
	}
}

function updateSelect(id) {
	choice = $(id + "_choice option:selected").text();
	$(id + "_num").prop('disabled', true).empty();

	if ($(id + "_type option:selected").text() == "Item") {
		if (choice == "Ban")
			addOptions(id + "_sel", iBan);
		else if (choice == "Require")
			addOptions(id + "_sel", iReq);
	}
	else if ($(id + "_type option:selected").text() == "Power Up") {
		if (choice == "Ban")
			addOptions(id + "_sel", pBan);
		else if (choice == "Require") {
			addOptions(id + "_sel", pReq);
			updateNum(id);
		}
	}
	else if ($(id + "_type option:selected").text() == "Last Boss") {
		addOptions(id + "_sel", boss);
	}
	else if ($(id + "_type option:selected").text() == "First Mini-Boss") {
		addOptions(id + "_sel", mboss);
	}
}

function updateNum(id) {
	if ($(id + "_choice option:selected").text() == "Require") {
		if($(id + "_type option:selected").text() == "Power Up") {
			$(id + "_num").prop('disabled', false);
			var values = []
			switch($(id + "_sel option:selected").text()) {
				case lib['missiles']:
					for (i = 10; i <= maxM; i += 5)
						values.push(i);
					break;
				case lib['supers']:
					for (i = 10; i <= maxS; i += 5)
						values.push(i);
					break;
				case lib['pbs']:
					for (i = 10; i <= maxP; i += 5)
						values.push(i);
					break;
				case lib['ets']:
					for (i = 4; i <= maxE; i += 1)
						values.push(i);
					break;
				case lib['reserve']:
					for (i = 1; i <= maxR; i += 1)
						values.push(i);
					break;
			}
			addOptions(id + "_num", values);
		}
	}
}

function addOptions(id, options) {
	$(id)
		.empty()
	$.each(options, function(key, value) {
		$(id)
			.append($("<option></option>")
			.attr("value",value)
			.text(value));
		});
}

$(document).ready(function() {
	$("#ver").html("(v" + [ver_major, ver_minor, ver_revision].join('.') + ")");
	$("#p1name").on('input', function() {
		$("#p1a").html( $(this).val() );
		$("#p1b").html( $(this).val() );
	});
	$("#p2name").on('input', function() {
		$("#p2a").html( $(this).val() );
		$("#p2b").html( $(this).val() );
	});
	$("#p1c1_choice").change(function() {updateType("#p1c1");});
	$("#p1c1_type").change(function() {updateSelect("#p1c1");});
	$("#p2c1_choice").change(function() {updateType("#p2c1");});
	$("#p2c1_type").change(function() {updateSelect("#p2c1");});
	$("#p2c2_choice").change(function() {updateType("#p2c2");});
	$("#p2c2_type").change(function() {updateSelect("#p2c2");});
	$("#p1c2_choice").change(function() {updateType("#p1c2");});
	$("#p1c2_type").change(function() {updateSelect("#p1c2");});

	$("#p1c1_sel").change(function() {updateNum("#p1c1");});
	$("#p2c1_sel").change(function() {updateNum("#p2c1");});
	$("#p2c2_sel").change(function() {updateNum("#p2c2");});
	$("#p1c2_sel").change(function() {updateNum("#p1c2");});
	
	$("#p1c1_apply").click(function() {applyChoice(1);});
	$("#p2c1_apply").click(function() {applyChoice(2);});
	$("#p2c2_apply").click(function() {applyChoice(3);});
	$("#p1c2_apply").click(function() {applyChoice(4);});
	
	$("#resettool").click(function() {initTool();});
	initTool();
});

