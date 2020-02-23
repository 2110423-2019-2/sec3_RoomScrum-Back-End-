import { Controller } from "@nestjs/common";
import { HireeService } from "./hiree.service";

@Controller("hiree")
export class HireeController {
  constructor(private readonly hireeService: HireeService) {}
}
