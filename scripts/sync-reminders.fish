#!/usr/bin/env fish
# Usage: ./sync-reminders.fish '[{"id":"mq","completed":true},{"id":"mh","completed":false},{"id":"rp","completed":true}]'
# Met à jour src/data/today.json avec la date du jour et les statuts
# Puis commit + push automatiquement si GIT_AUTOPUSH=1

set today (date +%Y-%m-%d)
set payload $argv[1]

set data_dir (dirname (status filename))/../src/data
set json_file $data_dir/today.json

# Créer le répertoire si nécessaire
mkdir -p $data_dir

# Lire le fichier existant ou créer un objet vide
if test -f $json_file
    set existing (cat $json_file)
else
    set existing '{}'
end

# Parser le payload et construire l'objet du jour
set day_data '{'
set first 1
for item in (echo $payload | python3 -c "
import json, sys
data = json.load(sys.stdin)
for h in data:
    print(f\"{h['id']}:{1 if h['completed'] else 0}\")
")
    set parts (string split ':' $item)
    set hid $parts[1]
    set val $parts[2]
    if test $first -eq 1
        set day_data "$day_data\"$hid\":$val"
        set first 0
    else
        set day_data "$day_data,\"$hid\":$val"
    end
end
set day_data "$day_data}"

# Merger avec l'existant via python3
echo $existing | python3 -c "
import json, sys
existing = json.load(sys.stdin)
existing['$today'] = json.loads('$day_data')
print(json.dumps(existing, indent=2))
" > $json_file

echo "✅ Sync $today → $json_file"

# Auto commit + push si demandé
if test "$GIT_AUTOPUSH" = "1"
    set root (dirname (status filename))/..
    cd $root
    git add src/data/today.json
    git commit -m "sync: habitudes $today"
    git push
    echo "📤 Pushed to remote"
end
