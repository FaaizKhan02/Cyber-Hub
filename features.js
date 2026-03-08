// ==========================================
// NEW INTERACTIVE FEATURES & MAP RENDERER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Role-Based Learning Integration ---
    const roleSelect = document.getElementById("roleSelect");
    if (roleSelect) {
        roleSelect.addEventListener("change", (e) => {
            const role = e.target.value;
            // Map roles to types of attacks they should care most about
            const roleFilters = {
                "all": "All",
                "business": ["Ransomware", "Phishing", "Insider", "Social Engineering", "Espionage"],
                "developer": ["Web Application", "Supply Chain"],
                "it": ["Malware", "DDoS", "Supply Chain", "Ransomware"]
            };

            // We hook into the global 'attacks' mapping and 'renderAttacks'
            if (typeof attacks !== 'undefined' && typeof renderAttacks === 'function') {
                if (role === 'all') {
                    // Reset
                    document.getElementById('attackSearch').value = '';
                    window.currentTypeFilter = 'All';
                    document.querySelectorAll("#typeFilterChips .chip").forEach(c => c.classList.toggle("active", c.dataset.type === 'All'));
                    filterAttacks(); // from script.js
                } else {
                    const allowedTypes = roleFilters[role];
                    const filtered = attacks.filter(a => a.type.some(t => allowedTypes.includes(t)));
                    renderAttacks(filtered);
                    const countEl = document.getElementById("attackResultCount");
                    if (countEl) countEl.textContent = `Showing ${filtered.length} high-priority attacks for ${roleSelect.options[roleSelect.selectedIndex].text}`;
                }
            }
        });
    }

    // --- 2. Gamified Phishing Simulator ---
    const phishingScenarios = [
        {
            sender: "IT Support <support@paypa1-security.com>",
            subject: "Action Required: Verify Account Activity",
            body: "<p>Dear Customer,</p><p>We detected unusual activity on your account. Please click below to verify your identity immediately, or your account will be suspended in 24 hours.</p><p><a href='#'>Verify Account Now</a></p><p>Thanks,<br>Support Team</p>",
            isFake: true,
            feedback: "Fake! Red flags: The sender domain 'paypa1-security.com' is misspelled (paypa1 instead of paypal). It uses urgent, threatening language ('suspended in 24 hours') to create panic. Generic greeting ('Dear Customer')."
        },
        {
            sender: "HR Department <internal-hr@company.com>",
            subject: "Updates to 2026 Benefits Policy",
            body: "<p>Hi Team,</p><p>Please review the attached PDF regarding the updated 2026 healthcare benefits policy. Open enrollment ends this Friday.</p><p><a href='#'>benefits_2026_policy.pdf</a></p><p>Best,<br>HR</p>",
            isFake: false,
            feedback: "Real. This looks like a legitimate internal email. The sender domain matches the company, there are no immediate threats, and the context (benefits update) is normal. However, you should still always be careful with unexpected attachments!"
        },
        {
            sender: "Microsoft 365 <no-reply@microsoft-update-alert.net>",
            subject: "Your Password Expires Today",
            body: "<p>Your Office 365 password is set to expire in 2 hours. Keep your current password by verifying an ongoing session.</p><p><a href='#'>Keep Same Password</a></p>",
            isFake: true,
            feedback: "Fake! The domain 'microsoft-update-alert.net' is not a legitimate Microsoft domain. They try to create extreme urgency ('expires in 2 hours'). 'Keep Same Password' links are a classic credential stealing trick."
        }
    ];
    let currentPhishIdx = 0;

    function renderPhish() {
        const scenario = phishingScenarios[currentPhishIdx];
        const bodyEl = document.getElementById("phishingEmailBody");
        if (bodyEl) {
            bodyEl.innerHTML = `
                <div class="phish-sender">From: ${scenario.sender.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                <div class="phish-subject">Subject: ${scenario.subject}</div>
                <div class="phish-body">${scenario.body}</div>
            `;
        }
        document.getElementById("phishingFeedback")?.classList.add("hidden");
    }

    function checkPhish(userGuessIsFake) {
        const scenario = phishingScenarios[currentPhishIdx];
        const isCorrect = userGuessIsFake === scenario.isFake;

        const feedbackEl = document.getElementById("phishingFeedback");
        const titleEl = document.getElementById("phishResultTitle");
        const descEl = document.getElementById("phishResultDesc");

        if (feedbackEl && titleEl && descEl) {
            titleEl.textContent = isCorrect ? "✅ Correct!" : "❌ Incorrect";
            titleEl.style.color = isCorrect ? "var(--success)" : "var(--danger)";
            descEl.textContent = scenario.feedback;
            feedbackEl.classList.remove("hidden");
        }
    }

    document.getElementById("btnIsReal")?.addEventListener("click", () => checkPhish(false));
    document.getElementById("btnIsFake")?.addEventListener("click", () => checkPhish(true));
    document.getElementById("btnNextPhish")?.addEventListener("click", () => {
        currentPhishIdx = (currentPhishIdx + 1) % phishingScenarios.length;
        renderPhish();
    });

    if (document.getElementById("phishingGame")) renderPhish();

    // --- 3. Am I Pwned Integration (Demonstration) ---
    const btnPwned = document.getElementById("btnCheckPwned");
    const inputPwned = document.getElementById("pwnedInput");
    const resultsPwned = document.getElementById("pwnedResults");

    const mockBreaches = [
        { name: "Canva Breach", year: 2019, data: "Email addresses, Passwords, Names" },
        { name: "LinkedIn Scrape", year: 2021, data: "Email addresses, Job titles, Phone numbers" },
        { name: "MyFitnessPal", year: 2018, data: "Email addresses, Passwords, IP addresses" },
        { name: "Adobe Hack", year: 2013, data: "Email addresses, Password hints, Passwords" }
    ];

    if (btnPwned && inputPwned && resultsPwned) {
        btnPwned.addEventListener("click", () => {
            const email = inputPwned.value.trim().toLowerCase();
            if (!email || !email.includes('@')) {
                alert("Please enter a valid email address.");
                return;
            }
            resultsPwned.classList.remove("hidden");
            resultsPwned.innerHTML = `<div style="text-align:center"><div class="spinner"></div><p style="margin-top:10px; color:var(--text-muted)">Querying databases...</p></div>`;

            // Deterministic random so the same email gives the same result
            let hash = 0;
            for (let i = 0; i < email.length; i++) hash += email.charCodeAt(i);

            setTimeout(() => {
                const count = hash % 3; // 0, 1, or 2 breaches
                if (count === 0) {
                    resultsPwned.innerHTML = `<div class="pwned-safe"><h4>✅ Good news!</h4><p>No breaches found for <strong>${email}</strong> in our simulation database. Keep practicing good password hygiene.</p></div>`;
                } else {
                    let html = `<div style="margin-bottom:10px"><h4 style="color:var(--danger)">⚠️ Oh no! Pwned in ${count} data breach${count > 1 ? 'es' : ''}.</h4><p style="font-size:0.85rem; color:var(--text-muted)">This is a simulation. Here is what an exposure looks like:</p></div>`;
                    for (let i = 0; i < count; i++) {
                        const b = mockBreaches[(hash + i) % mockBreaches.length];
                        html += `<div class="pwned-item"><h4>${b.name} (${b.year})</h4><p><strong>Compromised data:</strong> ${b.data}</p></div>`;
                    }
                    html += `<p style="font-size:0.8rem; margin-top:10px; color:var(--text-muted)">If this were real, you should immediately change your password anywhere you reused it and enable MFA.</p>`;
                    resultsPwned.innerHTML = html;
                }
            }, 1500);
        });
    }

    // --- 4. Massive Expansion of AI Knowledge ---
    // We override the global generateChatReply after script.js has loaded
    setTimeout(() => {
        if (typeof window.generateChatReply === 'function') {
            const extendedKeywords = {
                "zero trust": "Zero Trust is an architecture where no user or device is trusted by default, even if they are inside the network. 'Never trust, always verify'.",
                "iam": "Identity and Access Management (IAM) controls who can access what. Enforcing Least Privilege and MFA are the core of IAM.",
                "siem": "Security Information and Event Management (SIEM) tools aggregate logs from everywhere into one dashboard to help SOC analysts detect anomalies.",
                "soc": "A Security Operations Center (SOC) is the team and facility dedicated to monitoring and analyzing an organisation's security posture 24/7.",
                "vpn": "A Virtual Private Network (VPN) creates an encrypted tunnel for data. However, modern zero trust network access (ZTNA) is gradually replacing legacy VPNs.",
                "compliance": "Compliance means adhering to regulations like GDPR (privacy), HIPAA (healthcare), or PCI-DSS (payments). Compliance does NOT equal security, but they overlap.",
                "gdpr": "The General Data Protection Regulation (GDPR) forces companies to protect EU citizens' data, bringing heavy fines for breaches and mandating breach notifications within 72 hours.",
                "mitre": "The MITRE ATT&CK framework categorises post-compromise adversary behaviour. It is the gold standard for mapping out 'how' attackers operate (tactics & techniques).",
                "cryptography": "Cryptography protects data confidentiality and integrity. Symmetrical (AES) uses one key; Asymmetrical (RSA) uses a public/private key pair.",
                "firewall": "Firewalls filter traffic based on rules. Next-Generation Firewalls (NGFW) inspect application-layer traffic, not just IP/ports.",
                "endpoint": "Endpoint Detection and Response (EDR) goes beyond antivirus by monitoring process behavior and network connections on laptops and servers in real-time.",
                "mfa": "Multi-Factor Authentication (MFA) requires two or more pieces of evidence (password + phone token). Phishing-resistant MFA (like FIDO2 keys) is the best standard.",
                "social engineering": "Social engineering manipulates human psychology, rather than technical flaws, to gain access. Trust, fear, or urgency are typical triggers.",
                "patch": "Patch management is the process of updating software. Unpatched vulnerabilities (like Log4Shell or EternalBlue) are the most common way attackers gain initial access."
            };

            const originalFn = window.generateChatReply;
            window.generateChatReply = function (msg) {
                const input = msg.toLowerCase().trim();
                for (const [key, val] of Object.entries(extendedKeywords)) {
                    if (input.includes(key)) return val + " Let me know if you need examples!";
                }
                return originalFn(msg); // Fallback to the original logic for attacks and basics
            };
        }
    }, 500);

    // --- 5. Highly Detailed GeoJSON Canvas Map ---
    const canvas = document.getElementById("worldMapCanvas");
    if (canvas) {
        // High-performance canvas mapping without massive external dependencies
        const ctx = canvas.getContext("2d");
        let geoData = null;
        let mapDimensions = { w: 0, h: 0 };

        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return; // Prevent collapse when hidden
            // Scale up for retina displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            mapDimensions = { w: rect.width, h: rect.height };
            drawMap();
        }

        window.addEventListener("resize", () => {
            // Debounce canvas resize
            clearTimeout(window.mapResizeTimer);
            window.mapResizeTimer = setTimeout(resizeCanvas, 200);
        });

        // Simple equirectangular projection mapping lon/lat to canvas x/y
        function project(lng, lat, w, h) {
            // Adjust offsets and scale to fit the map elegantly in the box
            const scale = w / 360;
            const x = (lng + 180) * scale;
            // Squish height a bit visually
            const y = (90 - lat) * (h / 180) * 1.2 - (h * 0.1);
            return { x, y };
        }

        function drawMap() {
            if (!geoData) return;
            ctx.clearRect(0, 0, mapDimensions.w, mapDimensions.h);

            // Draw all countries
            ctx.fillStyle = "rgba(15, 23, 42, 0.6)"; // Dark blueish gray
            ctx.strokeStyle = "rgba(56, 189, 248, 0.4)"; // Bright neon blue
            ctx.lineWidth = 1;

            geoData.features.forEach(feature => {
                if (!feature.geometry) return;

                if (feature.geometry.type === "Polygon") {
                    drawPolygon(feature.geometry.coordinates[0]);
                } else if (feature.geometry.type === "MultiPolygon") {
                    feature.geometry.coordinates.forEach(poly => {
                        drawPolygon(poly[0]);
                    });
                }
            });

            // Re-draw active attack regions if any exist globally
            if (window.currentActiveAttackMap) {
                drawActiveAttack(window.currentActiveAttackMap);
            }
        }

        function drawPolygon(coords) {
            if (!coords || !coords.length) return;
            ctx.beginPath();
            coords.forEach((c, idx) => {
                const p = project(c[0], c[1], mapDimensions.w, mapDimensions.h);
                if (idx === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // Define representative center coordinates for regions
        const regionCenters = {
            "na": [-100, 40], "sa": [-60, -15], "eu": [15, 50],
            "af": [20, 5], "as": [90, 40], "me": [45, 25], "oc": [135, -25]
        };

        function drawActiveAttack(attack) {
            // Give glowing pulsing dots on origin and targets
            const drawGlowPoint = (lng, lat, color) => {
                const pt = project(lng, lat, mapDimensions.w, mapDimensions.h);
                // Glow
                const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 25);
                grad.addColorStop(0, color.replace('1)', '0.8)'));
                grad.addColorStop(0.3, color.replace('1)', '0.4)'));
                grad.addColorStop(1, color.replace('1)', '0)'));

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 25, 0, Math.PI * 2);
                ctx.fill();

                // Solid dot
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fill();
            };

            const origins = attack.origins || [];
            const targets = attack.regions || [];

            origins.forEach(r => {
                if (regionCenters[r]) drawGlowPoint(regionCenters[r][0], regionCenters[r][1], "rgba(255, 75, 106, 1)");
            });
            targets.forEach(r => {
                if (regionCenters[r] && !origins.includes(r)) drawGlowPoint(regionCenters[r][0], regionCenters[r][1], "rgba(56, 189, 248, 1)");
            });

            // Draw sweeping curves between origin and target!
            origins.forEach(o => {
                targets.forEach(t => {
                    if (o !== t && regionCenters[o] && regionCenters[t]) {
                        const start = project(regionCenters[o][0], regionCenters[o][1], mapDimensions.w, mapDimensions.h);
                        const end = project(regionCenters[t][0], regionCenters[t][1], mapDimensions.w, mapDimensions.h);

                        ctx.beginPath();
                        ctx.moveTo(start.x, start.y);
                        // Quadratic curve upward (simulate trajectory)
                        const midX = (start.x + end.x) / 2;
                        const midY = (start.y + end.y) / 2 - 50;
                        ctx.quadraticCurveTo(midX, midY, end.x, end.y);

                        ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
                        ctx.lineWidth = 2;

                        // dash effect
                        ctx.setLineDash([5, 5]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                });
            });
        }

        // Expose a function that script.js can call (we overwrite the old one)
        window.currentActiveAttackMap = null;
        window.updateMapForAttack = function (attack) {
            window.currentActiveAttackMap = attack;
            if (geoData) drawMap(); // Will re-clear and re-draw including vectors
        };

        // Fetch the external GeoJSON file 
        fetch("world-countries.json")
            .then(res => res.json())
            .then(data => {
                geoData = data;
                resizeCanvas();
                // Initial map draw
            }).catch(err => {
                console.error("Failed to load map data", err);
                const neon = document.getElementById("neonMapOverlay");
                if (neon) neon.innerHTML = "<p style='padding:20px;color:red'>GeoJSON Failed to load. Check local server.</p>";
            });
    }

});
