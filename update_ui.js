const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');
script = script.replace(
    /'<h4>Who does it<\/h4><p>' \+ attack\.actors \+ '<\/p>' \+\s*'<h4>How it works<\/h4><p>' \+ attack\.vector \+ '<\/p>' \+\s*'<h4>Impact<\/h4><p>' \+ attack\.impact \+ '<\/p>' \+\s*'<h4>Detection & resolution<\/h4><p>' \+ attack\.resolution \+ '<\/p>'/,
    `'<h4>Who does it</h4><p>' + attack.actors + '</p>' +
        '<h4>Why it happens</h4><p>' + (attack.whyItHappens || "Financial extortion, data theft, or service disruption.") + '</p>' +
        '<h4>How it happens (Loopholes)</h4><p>' + (attack.howItHappens || attack.vector) + '</p>' +
        '<h4>Impact & Damage</h4><p>' + attack.impact + '</p>' +
        '<h4>How organizations stop it</h4><p>' + (attack.howToStop || attack.resolution) + '</p>' +
        '<h4>Future prevention (Saving the org)</h4><p>' + (attack.futurePrevention || "Patch systems, enforce MFA, and maintain backups.") + '</p>'`
);

let startLiveAttackReplacement = `function startLiveAttackFeed() {
    var candidates = attacks.filter(function (a) {
        return a.origins && a.origins.length && a.regions && a.regions.length;
    });
    if (!candidates.length) return;
    var idx = 0;

    function show(a) {
        var t = document.getElementById("liveAttackTitle");
        var r = document.getElementById("liveAttackRoute");
        var d = document.getElementById("liveAttackDetail");
        var m = document.getElementById("mapSelectedAttack");
        if (t) t.textContent = "🔴 LIVE: " + a.name;
        var origin = regionNameFromCode(a.origins[0]);
        var target = a.regions.length > 1 ? "Multiple regions" : regionNameFromCode(a.regions[0]);
        if (r) r.innerHTML = '<span style="color:#ff4b6a">'+origin+'</span> <span style="color:#5d7bff; font-weight:bold;">→</span> <span style="color:#38bdf8">'+target+'</span>';
        if (d) d.innerHTML = '<strong>Vector:</strong> ' + a.vector + '<br/><strong>Status:</strong> Active exploitation...';
        if (m) m.textContent = a.name + " (" + (Math.floor(Math.random() * 5000) + 100) + " hits/sec)";
        updateMapForAttack(a);
    }

    show(candidates[0]);
    setInterval(function () {
        idx = Math.floor(Math.random() * candidates.length);
        show(candidates[idx]);
    }, 2800); // Faster, more "live" feeling
}`;

script = script.replace(/function startLiveAttackFeed\(\) \{[\s\S]*?\n\}/, startLiveAttackReplacement);

fs.writeFileSync('script.js', script);
console.log('script.js successfully updated.');
