#!/bin/bash
export NEBIUS_API_KEY="v1.CmQKHHN0YXRpY2tleS1lMDByYmp4ZzRta3MwanIyOWQSIXNlcnZpY2VhY2NvdW50LWUwMHlmanYwa2U2MjFzMDB0cjIMCKq8mc0GEJKg_IwBOgwIqb-xmAcQwMyo9gJAAloDZTAw.AAAAAAAAAAFP65vPOB2qiB_Ym8XOL_LDDfNkbggWL9pzPrCRlO5Ye9XZKo5pINupFKXELVYAjEroDjypO8MGRasIJlh5vWoF"
export PROJECT_ROOT="/a0/usr/projects/testbikinweb1"
cd $PROJECT_ROOT
pi --verbose -e ~/.pi/extensions/nebius.js --provider nebius --model moonshotai/Kimi-K2.5 "$@"
