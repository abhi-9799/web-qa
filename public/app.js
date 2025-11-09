document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const result = document.getElementById("result");
  const err = {
    name: document.getElementById("err-name"),
    email: document.getElementById("err-email"),
    password: document.getElementById("err-password")
  };
  const pwHint = document.getElementById("pw-hint");

  function scorePassword(pw) {
    let score = 0;
    if (!pw) return score;
    if (pw.length >= 6) score += 1;
    if (pw.length >= 10) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return Math.min(score, 5);
  }

  function strengthLabel(score) {
    if (score <= 1) return { text: "Weak", color: "#b00020" };
    if (score <= 3) return { text: "Okay", color: "#a36b00" };
    return { text: "Strong", color: "#0a7d00" };
  }

  document.getElementById("password").addEventListener("input", (e) => {
    const s = strengthLabel(scorePassword(e.target.value));
    pwHint.textContent = `Strength: ${s.text}`;
    pwHint.style.color = s.color;
  });

  function validate({ name, email, password }) {
    let ok = true;
    Object.values(err).forEach(n => (n.textContent = ""));

    if (!name || name.trim().length < 2) { err.name.textContent = "Name must be at least 2 characters"; ok = false; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { err.email.textContent = "Enter a valid email"; ok = false; }

    const pwScore = scorePassword(password);
    if (!password || password.length < 6) {
      err.password.textContent = "Password must be at least 6 chars";
      ok = false;
    } else if (pwScore <= 1) {
      err.password.textContent = "Password too weak";
      ok = false;
    }

    // ensure hint shows even if user never typed
    if (password) {
      const s = strengthLabel(pwScore);
      pwHint.textContent = `Strength: ${s.text}`;
      pwHint.style.color = s.color;
    } else {
      pwHint.textContent = "";
    }

    return ok;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    result.style.display = "none";

    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    if (!validate(payload)) return;

    const btn = document.getElementById("submit-btn");
    btn.disabled = true;
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        result.style.display = "block";
        form.reset();
        pwHint.textContent = ""; // clear hint after success
      } else {
        alert(data.error || "Signup failed");
      }
    } catch {
      alert("Network error");
    } finally {
      btn.disabled = false;
    }
  });

  // expose readiness for tests
  window.__appReady = true;
});
