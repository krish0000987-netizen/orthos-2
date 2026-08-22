import os
from PIL import Image, ImageDraw, ImageFont

output_dir = "/Users/himanshu/Documents/orthos 2nd website/assets"
os.makedirs(output_dir, exist_ok=True)

def create_image(filename, width, height, bg_color, title, subtitle, bullets, badge_text="", badge_color=(29, 78, 216), accent_color=(2, 132, 199)):
    img = Image.new("RGB", (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Draw outer container card border
    draw.rounded_rectangle([15, 15, width - 15, height - 15], radius=16, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    # Inner background header
    draw.rounded_rectangle([30, 30, width - 30, 110], radius=12, fill=(241, 245, 249), outline=(226, 232, 240), width=1)
    
    font_title = ImageFont.load_default()
    draw.text((50, 48), title.upper(), fill=(15, 23, 42), font=font_title)
    draw.text((50, 72), subtitle, fill=accent_color, font=font_title)
    
    # Draw visual container box
    draw.rounded_rectangle([40, 130, width - 40, height - 80], radius=12, fill=(248, 250, 252), outline=(203, 213, 225), width=2)

    # Draw diagram vectors / graphics
    if "ROBOTIC" in title.upper() or "TRAUMA" in title.upper():
        for x in range(60, width - 60, 40):
            draw.line([(x, 140), (x, height - 90)], fill=(226, 232, 240), width=1)
        draw.line([(80, 200), (width - 80, 200)], fill=badge_color, width=4)
        draw.ellipse([(width//2 - 25, 175), (width//2 + 25, 225)], fill=(255, 255, 255), outline=accent_color, width=4)
    elif "SPINE" in title.upper() or "BACK" in title.upper():
        for y_pos in range(150, height - 100, 25):
            draw.rounded_rectangle([width//2 - 40, y_pos, width//2 + 40, y_pos + 18], radius=4, fill=(241, 245, 249), outline=accent_color, width=2)
    elif "REPLACEMENT" in title.upper() or "HIP" in title.upper() or "KNEE" in title.upper():
        draw.ellipse([(width//2 - 40, 150), (width//2 + 40, 230)], fill=(224, 242, 254), outline=badge_color, width=3)
        draw.line([(width//2, 150), (width//2, height - 100)], fill=(29, 78, 216), width=5)
    else:
        draw.rectangle([60, 150, width - 60, height - 110], fill=(241, 245, 249), outline=accent_color, width=2)

    # Draw bullet text items inside image
    y_txt = 150
    for bullet in bullets:
        draw.text((60, y_txt), f"* {bullet}", fill=(51, 65, 85), font=font_title)
        y_txt += 24

    # Bottom Banner Badge
    if badge_text:
        draw.rounded_rectangle([width//2 - 180, height - 60, width//2 + 180, height - 20], radius=15, fill=badge_color)
        draw.text((width//2 - 140, height - 46), badge_text.upper(), fill=(255, 255, 255), font=font_title)

    img.save(os.path.join(output_dir, filename))
    print(f"Generated {filename}")

# Generate all required PNG images
create_image("hero_robotics_surgery.png", 800, 450, (248, 250, 252), "Robotic Surgery Suite", "Computer-Assisted Joint Replacement", ["Sub-millimeter Accuracy: 99.8%", "3D Anatomical Patient Mapping", "Minimal Tissue Trauma"], "ROBOTIC JOINT REPLACEMENT TECH", (29, 78, 216), (2, 132, 199))

create_image("hero_spine_biomechanics.png", 800, 450, (248, 250, 252), "Spine Biomechanics", "3D Spinal Alignment & Nerve Relief", ["Cervical & Lumbar Decompression", "Sciatica Nerve Mapping", "Postural Restoration"], "SPINE & BACK CARE SPECIALIZATION", (124, 58, 237), (217, 119, 6))

create_image("about_consultation_care.png", 600, 450, (248, 250, 252), "Patient Consultation Room", "Dr. Dharm Bedwal Clinical OPD", ["Thorough Physical Evaluation", "Evidence-Based Diagnosis", "Personalized Care Plan"], "COMPREHENSIVE OPD CARE", (29, 78, 216), (2, 132, 199))

create_image("about_surgical_precision.png", 600, 450, (248, 250, 252), "Digital Workstation", "Digital X-Ray & MRI Planning", ["High-Definition Radiography", "Pre-Surgical 3D Templating", "CT/MRI Integration"], "DIGITAL SURGICAL PLANNING", (217, 119, 6), (15, 23, 42))

create_image("specialty_trauma_care.png", 600, 400, (248, 250, 252), "Orthopaedic Trauma Care", "Complex Fracture & Dislocation", ["24/7 Emergency Stabilization", "Internal Locking Plate Fixation", "Non-union Reconstruction"], "24/7 EMERGENCY TRAUMA CARE", (225, 29, 72), (180, 83, 9))

create_image("specialty_spine_care.png", 600, 400, (248, 250, 252), "Spine & Back Care", "Sciatica & Disc Decompression", ["Targeted Nerve Root Blocks", "Herniated Disc Management", "Minimally Invasive Discectomy"], "EXPERT SPINE SPECIALIZATION", (124, 58, 237), (2, 132, 199))

create_image("specialty_knee_replacement.png", 600, 400, (248, 250, 252), "Total Knee Replacement", "Computer-Assisted Knee Surgery", ["Pain-Free Walking Restored", "High-Flex Long-Life Implants", "Rapid Mobility Recovery"], "PRECISION KNEE REPLACEMENT", (29, 78, 216), (5, 150, 105))

create_image("specialty_hip_replacement.png", 600, 400, (248, 250, 252), "Total Hip Replacement", "Ceramic Bearing Hip Surgery", ["Avascular Necrosis Treatment", "Anatomical Stem Placement", "Full Range Motion Restored"], "ADVANCED HIP RECONSTRUCTION", (217, 119, 6), (180, 83, 9))

create_image("facility_reception.png", 800, 450, (248, 250, 252), "Orthos Clinic Lounge", "Seawoods West Clinic Reception", ["Executive Air-Conditioned Lounge", "Prioritized OPD Scheduling", "Krsnaa Diagnostics Partner"], "ORTHOS SPECIALITY CLINIC", (29, 78, 216), (234, 88, 12))

create_image("facility_diagnostic_suite.png", 800, 450, (248, 250, 252), "Diagnostic Suite", "In-House Radiology & Pathology", ["Digital X-Ray Scans", "MRI & CT Scan Partnering", "Full Lab Diagnostics"], "INTEGRATED DIAGNOSTICS LAB", (14, 116, 144), (124, 58, 237))

create_image("patient_recovery_knee.png", 600, 400, (248, 250, 252), "Patient Recovery Progress", "Pain-Free Mobility Milestones", ["Pre-Op Pain Drop (9/10 to 0/10)", "Week 2 Active Rehabilitation", "Full Mobility at 3 Weeks"], "98.5% PATIENT SATISFACTION", (5, 150, 105), (29, 78, 216))

create_image("booking_orthos_building.png", 800, 450, (248, 250, 252), "Orthos Clinic Facade", "Shop 3-6, Om Nilkanth CHS", ["Sector 42-A, Seawoods (West)", "Navi Mumbai 400706", "Prior Appointment Consultations"], "VISIT ORTHOS CLINIC SEAWOODS", (217, 119, 6), (15, 23, 42))

print("All PNG assets created successfully!")
